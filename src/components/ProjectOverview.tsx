import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { projects } from "@data/projects";

export default function ProjectOverview(props: any) {
  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold">
                {projects[0].category}
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary dark:text-primary-dark sm:text-5xl">
                {projects[0].name}
              </p>
              <p className="mt-6 text-lg/8">{projects[0].description}</p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                {projects[0].features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-primary dark:text-primary-dark">
                      <FontAwesomeIcon
                        icon={feature.icon}
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          {props.image}
        </div>
      </div>
      <div className="mx-auto max-w-7xl text-center mt-10">
        <h3 className="text-2xl font-semibold tracking-tight text-body dark:text-body-dark sm:text-3xl">
          <span className="text-body dark:text-body-dark">{projects[0].cta.call}</span>
        </h3>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href={projects[0].cta.href}
            className="rounded-md bg-primary dark:bg-primary px-3.5 py-2.5 text-sm font-semibold text-white dark:text-body-dark shadow-xs hover:bg-primary-200 dark:hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
          >
            {projects[0].cta.action}
          </a>
        </div>
      </div>
    </div>
  );
}
