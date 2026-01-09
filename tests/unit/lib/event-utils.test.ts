import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { isUpcomingEvent, getEventStatus } from '@/lib/event-utils'

describe('Event Utils', () => {
  describe('isUpcomingEvent', () => {
    beforeEach(() => {
      // Mock the current date to 2025-01-15 in Athens timezone
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2025-01-15T12:00:00+02:00'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should return true for future dates', () => {
      expect(isUpcomingEvent('2025-01-20')).toBe(true)
      expect(isUpcomingEvent('2025-02-01')).toBe(true)
      expect(isUpcomingEvent('2026-01-01')).toBe(true)
    })

    it('should return true for today (event day)', () => {
      // Event is "upcoming" on the day it happens
      expect(isUpcomingEvent('2025-01-15')).toBe(true)
    })

    it('should return false for past dates', () => {
      expect(isUpcomingEvent('2025-01-14')).toBe(false)
      expect(isUpcomingEvent('2025-01-01')).toBe(false)
      expect(isUpcomingEvent('2024-12-31')).toBe(false)
    })

    it('should return false for yesterday', () => {
      expect(isUpcomingEvent('2025-01-14')).toBe(false)
    })
  })

  describe('getEventStatus', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2025-01-15T12:00:00+02:00'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should return "upcoming" for future events', () => {
      expect(getEventStatus('2025-01-20')).toBe('upcoming')
      expect(getEventStatus('2025-01-15')).toBe('upcoming') // today
    })

    it('should return "past" for past events', () => {
      expect(getEventStatus('2025-01-14')).toBe('past')
      expect(getEventStatus('2024-12-01')).toBe('past')
    })
  })
})
