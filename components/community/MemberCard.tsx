'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CommunityMember } from '@/lib/types'
import { Card } from '@/components/ui/Card'

interface MemberCardProps {
  member: CommunityMember
}

export function MemberCard({ member }: MemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const bioPreview = member.bio.slice(0, 150)
  const shouldTruncate = member.bio.length > 150

  // Generate initials for fallback avatar
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const roleColors = {
    organizer: 'bg-js-yellow text-js-black',
    speaker: 'bg-blue-500 text-white dark:bg-blue-600',
    member: 'bg-gray-500 text-white dark:bg-gray-600',
  }

  const roleColor = roleColors[member.role] || roleColors.member

  return (
    <Card data-testid="member-card" className="p-6 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div
          data-testid="member-avatar"
          className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        >
          {member.avatar ? (
            <Image
              src={member.avatar}
              alt={member.name}
              width={80}
              height={80}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
              {initials}
            </span>
          )}
        </div>

        {/* Name and Role */}
        <div className="flex-1 min-w-0">
          <h3
            data-testid="member-name"
            className="text-xl font-bold text-gray-900 dark:text-white mb-1"
          >
            {member.name}
          </h3>
          <span
            data-testid="member-role"
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${roleColor} mb-2`}
          >
            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
          </span>
          {member.title && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {member.title}
              {member.company && <span> @ {member.company}</span>}
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      <div
        data-testid="member-bio"
        className="flex-1 text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4"
      >
        {isExpanded || !shouldTruncate ? member.bio : `${bioPreview}...`}
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 text-js-yellow hover:text-js-yellow/80 font-medium transition-colors"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Skills */}
      {member.skills && member.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Skills:
          </p>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contributed Talks */}
      {member.contributedTalks && member.contributedTalks.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Talks:
          </p>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            {member.contributedTalks.slice(0, 3).map((talk, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{talk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Social Links */}
      {member.social && (
        <div data-testid="member-social" className="flex gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          {member.social.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {member.social.twitter && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          )}
          {member.social.website && (
            <a
              href={member.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              aria-label="Website"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </a>
          )}
        </div>
      )}
    </Card>
  )
}
