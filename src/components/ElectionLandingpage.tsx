import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { claim, heading, intro, positions } from "../data/manifesto";

export default function ElectionLandingPage(props: any) {
  return (
    <main>
      <div
        className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold">
                  {claim}
                </h2>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-yellow sm:text-5xl">
                  {heading}
                </h1>
                <p className="mt-6 text-lg/8">{intro}</p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                  {positions.map((position) => (
                    <div key={position.name} className="relative pl-9">
                      <dt className="inline font-semibold text-yellow">
                        <FontAwesomeIcon
                          icon={position.icon}
                          aria-hidden="true"
                          className="absolute top-1 left-1 size-5 text-yellow"
                        />
                        {position.name}
                      </dt>{" "}
                      <dd className="inline">{position.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            {props.portrait}
          </div>
        </div>
      </div>
      <div className="px-6 py-14 sm:py-22 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-yellow sm:text-5xl">
            <span className="text-yellow">Überzeugt?</span>
          </h2>
          <h3 className="mt-1 text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">Platz 56 der Landesliste der GRÜNEN am 2. März!</h3>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="https://www.gruene-hamburg.de/gute-gruende-fuer-gruen/"
              className="text-sm/6 font-semibold"
            >
              Lese das Wahlprogramm <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
