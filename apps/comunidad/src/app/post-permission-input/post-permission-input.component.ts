import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PermissionLevel, SupabaseService } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-post-permission-input',
  templateUrl: './post-permission-input.component.html',
  styleUrls: ['./post-permission-input.component.scss'],
})
export class PostPermissionInputComponent implements OnInit, OnChanges {
  permissionLevels: PermissionLevel[] = [];
  selectedPermission?: PermissionLevel;
  isOpen = false;
  @Output() changePermissionLevel = new EventEmitter<PermissionLevel>();
  @Input() preselectedPermission?: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['preselectedPermission']) {
      const levelNum: number = changes['preselectedPermission'].currentValue;
      const level: PermissionLevel | undefined = this.permissionLevels.find(
        (p) => p.permission_level === levelNum
      );
      if (!level) return;
      this.selectPermissionLevel(level);
    }
  }

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit() {
    this.permissionLevels =
      (await this.supabase.getPostPermissionLevels()) || [];

    if (!this.preselectedPermission) return;

    const level: PermissionLevel | undefined = this.permissionLevels.find(
      (p) => p.permission_level === this.preselectedPermission
    );

    if (!level) return;

    this.selectPermissionLevel(level);
  }

  selectPermissionLevel(permission: PermissionLevel) {
    this.selectedPermission = permission;
    this.isOpen = false;
    this.changePermissionLevel.emit(permission);
  }
}
