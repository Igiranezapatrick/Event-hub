import { addDays, format } from "date-fns";
import type {
  AnalyticsSummary,
  CourseListing,
  EventListing,
  OrganizerProfile,
  Review,
  TicketOrder,
  TicketType,
} from "@/lib/types";

const now = new Date();

export const organizers: OrganizerProfile[] = [
  {
    id: "org_1",
    fullName: "Aline Uwera",
    username: "aline-uwera",
    email: "aline@eventhub.rw",
    phoneNumber: "+250 788 000 111",
    bio: "Creator of impact-focused events and startup learning experiences.",
    country: "Rwanda",
    city: "Kigali",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    role: "organizer",
    organizationName: "Kigali Growth Lab",
    verified: true,
  },
  {
    id: "org_2",
    fullName: "Eric Habimana",
    username: "eric-habimana",
    email: "eric@learnhub.rw",
    phoneNumber: "+250 788 000 222",
    bio: "Trainer, speaker, and bootcamp facilitator for digital careers.",
    country: "Rwanda",
    city: "Kigali",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    role: "organizer",
    organizationName: "LearnHub Rwanda",
    verified: true,
  },
];

export const events: EventListing[] = [
  {
    id: "evt_1",
    slug: "kigali-innovation-forum-2026",
    title: "Kigali Innovation Forum 2026",
    description:
      "A two-day conference for founders, investors, creators, and institutions shaping the next generation of East African products.",
    category: "Conference",
    coverImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    ],
    venue: "Kigali Convention Centre, Rwanda",
    googleMapsUrl: "https://maps.google.com/?q=Kigali+Convention+Centre",
    startDate: format(addDays(now, 19), "yyyy-MM-dd'T'09:00:00"),
    endDate: format(addDays(now, 20), "yyyy-MM-dd'T'17:30:00"),
    capacity: 1200,
    ticketPrice: 25000,
    currency: "RWF",
    status: "published",
    tags: ["technology", "startups", "innovation"],
    organizerId: "org_1",
    organizerName: "Aline Uwera",
    organizerAvatar: organizers[0].profileImage ?? "",
    organizerRole: "Creator",
    attendees: 862,
    rating: 4.9,
    reviewsCount: 48,
    featured: true,
  },
  {
    id: "evt_2",
    slug: "rwanda-digital-marketing-bootcamp",
    title: "Rwanda Digital Marketing Bootcamp",
    description:
      "Hands-on bootcamp for businesses, creators, and students who want to master acquisition, funnels, and analytics.",
    category: "Bootcamp",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    ],
    venue: "LearnHub Campus, Kigali",
    googleMapsUrl: "https://maps.google.com/?q=Kigali",
    startDate: format(addDays(now, 12), "yyyy-MM-dd'T'10:00:00"),
    endDate: format(addDays(now, 25), "yyyy-MM-dd'T'15:00:00"),
    capacity: 160,
    ticketPrice: 120000,
    currency: "RWF",
    status: "published",
    tags: ["marketing", "growth", "bootcamp"],
    organizerId: "org_2",
    organizerName: "Eric Habimana",
    organizerAvatar: organizers[1].profileImage ?? "",
    organizerRole: "Trainer",
    attendees: 98,
    rating: 4.8,
    reviewsCount: 27,
  },
  {
    id: "evt_3",
    slug: "teachers-digital-skills-workshop",
    title: "Teachers Digital Skills Workshop",
    description:
      "A practical workshop helping teachers create modern learning materials, classes, and online assessments.",
    category: "Workshop",
    coverImage:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    ],
    venue: "Kigali Public Library",
    googleMapsUrl: "https://maps.google.com/?q=Kigali+Public+Library",
    startDate: format(addDays(now, 6), "yyyy-MM-dd'T'08:30:00"),
    endDate: format(addDays(now, 6), "yyyy-MM-dd'T'16:30:00"),
    capacity: 80,
    ticketPrice: 0,
    currency: "RWF",
    status: "published",
    tags: ["education", "teachers", "training"],
    organizerId: "org_2",
    organizerName: "Eric Habimana",
    organizerAvatar: organizers[1].profileImage ?? "",
    organizerRole: "Trainer",
    attendees: 64,
    rating: 4.7,
    reviewsCount: 19,
    isFree: true,
  },
];

export const ticketTypes: TicketType[] = [
  { id: "tt_1", eventId: "evt_1", name: "Regular", price: 25000, quantity: 700, sold: 530, saleStart: now.toISOString(), saleEnd: addDays(now, 18).toISOString(), currency: "RWF", tier: "regular" },
  { id: "tt_2", eventId: "evt_1", name: "VIP", price: 70000, quantity: 160, sold: 102, saleStart: now.toISOString(), saleEnd: addDays(now, 18).toISOString(), currency: "RWF", tier: "vip" },
  { id: "tt_3", eventId: "evt_1", name: "Student", price: 12000, quantity: 340, sold: 230, saleStart: now.toISOString(), saleEnd: addDays(now, 18).toISOString(), currency: "RWF", tier: "student" },
  { id: "tt_4", eventId: "evt_2", name: "Early Bird", price: 90000, quantity: 50, sold: 47, saleStart: now.toISOString(), saleEnd: addDays(now, 7).toISOString(), currency: "RWF", tier: "early_bird" },
  { id: "tt_5", eventId: "evt_2", name: "Regular", price: 120000, quantity: 110, sold: 51, saleStart: now.toISOString(), saleEnd: addDays(now, 24).toISOString(), currency: "RWF", tier: "regular" },
];

export const courses: CourseListing[] = [
  {
    id: "course_1",
    slug: "founder-marketing-system",
    title: "Founder Marketing System",
    description:
      "A course for founders who need a repeatable growth engine with landing pages, email, and paid campaigns.",
    category: "Business",
    coverImage:
      "https://images.unsplash.com/photo-1559028006-448665bd7c7f?auto=format&fit=crop&w=1600&q=80",
    price: 85000,
    currency: "RWF",
    duration: "6 weeks",
    learningOutcomes: ["Build funnels", "Analyze campaign performance", "Launch offers confidently"],
    modules: [
      {
        id: "m1",
        title: "Strategy and offer design",
        lessons: [
          { id: "l1", title: "Positioning", duration: "18 min" },
          { id: "l2", title: "Pricing the offer", duration: "24 min" },
        ],
      },
      {
        id: "m2",
        title: "Channel execution",
        lessons: [
          { id: "l3", title: "Meta ads basics", duration: "21 min" },
          { id: "l4", title: "Email automation", duration: "31 min", locked: true },
        ],
      },
    ],
    attachments: ["Templates bundle", "Workbook PDF"],
    enrollmentLimit: 120,
    enrolled: 83,
    organizerName: "Aline Uwera",
    organizerAvatar: organizers[0].profileImage ?? "",
    status: "published",
    rating: 4.8,
  },
  {
    id: "course_2",
    slug: "digital-skills-for-teachers",
    title: "Digital Skills for Teachers",
    description:
      "Learn to create lesson materials, manage assessments, and run blended learning experiences.",
    category: "Education",
    coverImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
    price: 45000,
    currency: "RWF",
    duration: "4 weeks",
    learningOutcomes: ["Create online classes", "Track learner progress", "Package content professionally"],
    modules: [
      {
        id: "m3",
        title: "Class setup",
        lessons: [
          { id: "l5", title: "Course planning", duration: "14 min" },
          { id: "l6", title: "Learning outcomes", duration: "16 min" },
        ],
      },
    ],
    attachments: ["Slides", "Assessment rubrics"],
    enrollmentLimit: 200,
    enrolled: 149,
    organizerName: "Eric Habimana",
    organizerAvatar: organizers[1].profileImage ?? "",
    status: "published",
    rating: 4.7,
  },
];

export const reviews: Review[] = [
  {
    id: "rev_1",
    targetType: "event",
    targetId: "evt_1",
    authorName: "Munyaneza Jean",
    rating: 5,
    body: "Excellent event flow, beautiful venue, and clear communication before the conference.",
    createdAt: addDays(now, -4).toISOString(),
  },
  {
    id: "rev_2",
    targetType: "course",
    targetId: "course_1",
    authorName: "Grace Nyiransabimana",
    rating: 5,
    body: "Practical lessons, useful templates, and a teacher who actually explains the numbers.",
    createdAt: addDays(now, -8).toISOString(),
  },
];

export const orders: TicketOrder[] = [
  {
    id: "ord_1",
    eventId: "evt_1",
    eventTitle: "Kigali Innovation Forum 2026",
    attendeeName: "Patrick Igiraneza",
    paymentMethod: "mtn_momo",
    paymentStatus: "success",
    amount: 25000,
    currency: "RWF",
    ticketId: "TRR-8D92-5K1X",
    qrPayload: "ticket://TRR-8D92-5K1X",
    createdAt: addDays(now, -1).toISOString(),
  },
  {
    id: "ord_2",
    eventId: "evt_2",
    eventTitle: "Rwanda Digital Marketing Bootcamp",
    attendeeName: "Aline Uwase",
    paymentMethod: "airtel_money",
    paymentStatus: "verified",
    amount: 120000,
    currency: "RWF",
    ticketId: "TRR-4Q7J-2M8R",
    qrPayload: "ticket://TRR-4Q7J-2M8R",
    createdAt: addDays(now, -2).toISOString(),
  },
];

export const analytics: AnalyticsSummary = {
  totalRevenue: 12500000,
  platformRevenue: 1250000,
  organizerRevenue: 11250000,
  platformFeeRate: 10,
  totalUsers: 12480,
  totalEvents: 328,
  totalCourses: 91,
  activeOrganizers: 142,
  monthlyGrowth: 18.4,
  ticketSales: 11492,
};

export const categories = [
  "Conference",
  "Workshop",
  "Bootcamp",
  "Training Program",
  "Course",
  "Class",
  "Business",
  "Education",
];

export const notifications = [
  { id: "n1", type: "new_event_published", title: "New Event Published", body: "Kigali Innovation Forum 2026 is now live.", when: "5 min ago" },
  { id: "n2", type: "ticket_purchased", title: "Ticket Purchased", body: "Patrick Igiraneza bought a Regular ticket.", when: "19 min ago" },
  { id: "n3", type: "course_enrollment", title: "Course Enrollment", body: "12 new students joined Digital Skills for Teachers.", when: "1 hour ago" },
  { id: "n4", type: "payment_success", title: "Payment Success", body: "MTN MoMo payment verified for ticket order ORD-1.", when: "2 hours ago" },
];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getTicketTypesForEvent(eventId: string) {
  return ticketTypes.filter((ticketType) => ticketType.eventId === eventId);
}

export function getReviewsForTarget(targetType: "event" | "course", targetId: string) {
  return reviews.filter((review) => review.targetType === targetType && review.targetId === targetId);
}
