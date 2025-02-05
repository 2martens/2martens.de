import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { claim, heading, intro, positions } from "../data/manifesto";

export default function ElectionLandingPage(props: any) {
  return (
    <>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-indigo-600">
                  {claim}
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  {heading}
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">{intro}</p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {positions.map((position) => (
                    <div key={position.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <FontAwesomeIcon
                          icon={position.icon}
                          aria-hidden="true"
                          className="absolute top-1 left-1 size-5 text-indigo-600"
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
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Überzeugt? <br /> Platz 56 der Landesliste der GRÜNEN am 2. März!
          </h2>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {/* <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </a> */}
            <a
              href="https://www.gruene-hamburg.de/gute-gruende-fuer-gruen/"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Lese das Wahlprogramm <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
