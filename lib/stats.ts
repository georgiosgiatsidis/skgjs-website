import { getAllEvents, getAllCommunityMembers } from './content'

// Hardcoded community stats
const FOUNDED_YEAR = 2024
const MEMBERS_COUNT = 380

export interface SiteStats {
  founded: number
  members: number
  meetups: number
  organizers: number
  speakers: number
}

export function getStats(): SiteStats {
  const events = getAllEvents()
  const allMembers = getAllCommunityMembers()

  const organizers = allMembers.filter((m) => m.role === 'organizer')
  const speakers = allMembers.filter((m) => m.role === 'speaker')

  return {
    founded: FOUNDED_YEAR,
    members: MEMBERS_COUNT,
    meetups: events.length,
    organizers: organizers.length,
    speakers: speakers.length,
  }
}
