import { writeFileSync } from 'fs'
import { execSync } from 'child_process'
import {
  introductionEmail,
  introductionEmailSubject,
  followUpEmail,
  followUpEmailSubject,
  finalOfferEmail,
  finalOfferEmailSubject,
} from '../src/lib/email-templates'

const sampleParams = {
  businessName: 'El Rincón de Juan Carlos',
  zone: 'Sur',
  category: 'restaurants',
  recipientEmail: 'info@elrinconjuancarlos.com',
  unsubscribeUrl: 'https://tenerife-experiences.com/unsubscribe?email=info@elrinconjuancarlos.com',
}

const templates = [
  {
    num: 1,
    subject: introductionEmailSubject(sampleParams),
    html: introductionEmail(sampleParams),
  },
  {
    num: 2,
    subject: followUpEmailSubject(sampleParams),
    html: followUpEmail(sampleParams),
  },
  {
    num: 3,
    subject: finalOfferEmailSubject(sampleParams),
    html: finalOfferEmail(sampleParams),
  },
]

for (const t of templates) {
  const path = `/tmp/email-preview-${t.num}.html`
  writeFileSync(path, t.html)
  console.log(`Email ${t.num} saved: ${path}`)
  console.log(`  Subject: ${t.subject}`)
}

console.log('\nOpening previews in browser...')
for (const t of templates) {
  execSync(`open /tmp/email-preview-${t.num}.html`)
}

console.log('Done! Check your browser for the 3 email previews.')
