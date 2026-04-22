import { Link } from 'react-router-dom'
import { SectionCard } from '../components/ui/SectionCard'

export function NotFoundPage() {
  return (
    <SectionCard title="Route not found" description="The requested page does not exist.">
      <Link to="/" className="text-sm font-semibold text-indigo-300">Return to landing page</Link>
    </SectionCard>
  )
}
