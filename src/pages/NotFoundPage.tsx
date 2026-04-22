import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-[1400px] flex-col items-start justify-center gap-6 px-6 sm:px-10">
      <p className="eyebrow">404 / off the map</p>
      <h1 className="display">
        Nothing <em className="display-italic">here.</em>
      </h1>
      <p className="lead">The page you wanted was deferred to Later, or never existed.</p>
      <Link to="/" className="btn btn-primary" data-cursor="magnet">
        Back to the start
      </Link>
    </section>
  )
}
