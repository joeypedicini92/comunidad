import { CameraIcon } from '@heroicons/react/20/solid';

export default function Example() {
  return (
    <div className="overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 bottom-0 left-3/4 hidden w-screen bg-gray-50 lg:block" />
        <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-lg font-semibold text-indigo-600">
              About Comunidad
            </h2>
            <h3 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Meet Joey and Lucy
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:col-start-2 lg:row-start-1">
            <svg
              className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
              />
            </svg>
            <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
              <figure>
                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                  <img
                    className="rounded-lg object-cover object-center shadow-lg"
                    src="daddy_lucy_laughing_deck.jpg"
                    alt=""
                    width={1184}
                    height={1376}
                  />
                </div>
                <figcaption className="mt-3 flex text-sm text-gray-500">
                  <CameraIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2">
                    Photograph by{' '}
                    <a
                      target={'_blank'}
                      href="https://www.instagram.com/simply_tathi/"
                      rel="noreferrer"
                    >
                      Tathiana Pedicini
                    </a>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="prose mt-8 lg:mt-0">
            <div className="mx-auto max-w-prose text-base lg:max-w-none">
              <p className="text-lg text-gray-500">
                Hello! My name is Joey and I am the founder of Comunidad(dies).
                I am a father first to my amazing daughter Luciana, husband
                second to my beautiful wife Tathiana. I am a software developer
                with 10 years of professional experience, and have a passion for
                building tools which genuinely improve people's lives.
              </p>
            </div>
            <div className="prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
              <p>
                I've recently begun to dive deep into spiritual learning,
                therapy, inner child healing, and general mindfulness. Part of
                that process has involved a lot of writing and journaling and
                reflection. I started by training myself to write whenever I
                sense my mind starting to wander. That then turned into a daily
                practice of writing down my thoughts and feelings.
              </p>
              <p>
                The problem I started to run into was that I was writing in a
                lot of different places. I had a journal, a Notion notebook,
                Google Docs, and a few other places where I was writing. I
                wanted to consolidate all of that into one place, and I wanted
                to be able to share it with others.
              </p>
              <p>
                That's where Comunidad(dies) comes in; I wanted to build a place
                where I could write, and where I could share my writing with
                others. I wanted to build a place where I could share my
                thoughts and feelings, and where others could find authentic
                community. I wanted to focus just on the writing, and not have
                to worry about the other stuff. I wanted to be able to pass down
                pieces of wisdom to Lucy as she gets older. None of my current
                journaling tools were able to do everything I wanted, so I
                decided to build my own.
              </p>
              <h3>Features that set Comunidad(dies) apart:</h3>
              <ul role="list">
                <li>Lightweight and simple to use.</li>
                <li>
                  Landing Page is a blank slate writing area that resets every
                  day.
                </li>
                <li>
                  Supports markdown for quick and non-intrusive formatting.
                </li>
                <li>
                  Multiple levels of sharing: private, send to email list, share
                  with Comunidad, post to publicly accessible blog.
                </li>
                <li>
                  Runs on the web, or can be downloaded and installed on
                  android, ios, mac, windows.
                </li>
                <li>
                  Daily writing prompts (taken from{' '}
                  <a href="https://www.amazon.com/Year-Spiritual-Awakening-Inspiration-Meditations/dp/1638786887">
                    A Year of Spiritual Awakening by Bela Devine
                  </a>
                  ).
                </li>
              </ul>
              <p>
                I find this useful for me as I continue on my journey of
                spiritual awakening. Hopefully you will too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
