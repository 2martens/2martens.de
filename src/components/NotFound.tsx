const base = import.meta.env.BASE_URL == "/" ? "" : import.meta.env.BASE_URL;

export default function NotFound() {
    return (
      <>
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold">404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-yellow sm:text-7xl">
              Seite nicht gefunden
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty sm:text-xl/8">
              Sorry, die Seite konnte nicht gefunden werden. Hier entsteht aber gerade eine neue Webseite. Schaue gerne später wieder vorbei.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={base + "/"}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-pretty text-black shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-600"
              >
                Zurück zur Startseite
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }
  