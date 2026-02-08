import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {type Project} from "@data/projects";
import type {ReactNode} from "react";

interface Props {
    project: Project;
    isLeft: boolean;
    image: ReactNode;
}

export default function ProjectOverview({project, isLeft, image}: Props) {
    return (
        <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {(isLeft && (
                        <div className="lg:pt-4 lg:pr-8">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base/7 font-semibold">
                                    {project.category}
                                </h2>
                                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary dark:text-primary-dark sm:text-5xl">
                                    {project.name}
                                </p>
                                <p className="mt-6 text-lg/8">{project.description}</p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                                    {project.features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-primary dark:text-primary-dark">
                                                <FontAwesomeIcon
                                                    icon={feature.icon}
                                                    aria-hidden="true"
                                                    className="absolute top-1 left-1 size-5"
                                                />
                                                {feature.name}
                                            </dt>
                                            {" "}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    ))}
                    {image}
                    {(!isLeft && (
                        <div className="lg:pt-4 lg:pl-8">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base/7 font-semibold">
                                    {project.category}
                                </h2>
                                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-primary dark:text-primary-dark sm:text-5xl">
                                    {project.name}
                                </p>
                                <p className="mt-6 text-lg/8">{project.description}</p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                                    {project.features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-primary dark:text-primary-dark">
                                                <FontAwesomeIcon
                                                    icon={feature.icon}
                                                    aria-hidden="true"
                                                    className="absolute top-1 left-1 size-5"
                                                />
                                                {feature.name}
                                            </dt>
                                            {" "}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {project.cta.show && (
                <div className="mx-auto max-w-7xl text-center mt-10">
                    <h3 className="text-2xl font-semibold tracking-tight text-body dark:text-body-dark sm:text-3xl">
                        <span className="text-body dark:text-body-dark">{project.cta.call}</span>
                    </h3>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href={project.cta.href}
                            className="rounded-md bg-primary dark:bg-primary px-3.5 py-2.5 text-sm font-semibold text-white dark:text-body-dark shadow-xs hover:bg-primary-200 dark:hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
                        >
                            {project.cta.action}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
