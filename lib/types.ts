export type UserRole = "super_admin" | "organizer" | "attendee";
export type ListingStatus = "draft" | "pending_review" | "published" | "cancelled";
export type TicketTier = "regular" | "vip" | "early_bird" | "student" | "custom";
export type PaymentMethod = "mtn_momo" | "airtel_money" | "card" | "free";
export type PaymentStatus = "pending" | "verified" | "success" | "failed" | "refunded";
export type NotificationType =
  | "new_event_published"
  | "ticket_purchased"
  | "event_reminder"
  | "course_enrollment"
  | "payment_success";

export type Profile = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  bio: string;
  country: string;
  city: string;
  profileImage?: string;
  role: UserRole;
};

export type OrganizerProfile = Profile & {
  organizationName: string;
  verified: boolean;
};

export type TicketType = {
  id: string;
  eventId: string;
  name: string;
  price: number;
  quantity: number;
  sold: number;
  saleStart: string;
  saleEnd: string;
  currency: "RWF" | "USD";
  tier: TicketTier;
};

export type Review = {
  id: string;
  targetType: "event" | "course";
  targetId: string;
  authorName: string;
  rating: number;
  body: string;
  createdAt: string;
};

export type EventListing = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  galleryImages: string[];
  venue: string;
  googleMapsUrl: string;
  startDate: string;
  endDate: string;
  capacity: number;
  ticketPrice: number;
  currency: "RWF" | "USD";
  status: ListingStatus;
  tags: string[];
  organizerId: string;
  organizerName: string;
  organizerAvatar: string;
  organizerRole: string;
  attendees: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  isFree?: boolean;
};

export type CourseModule = {
  id: string;
  title: string;
  lessons: { id: string; title: string; duration: string; locked?: boolean }[];
};

export type CourseListing = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  price: number;
  currency: "RWF" | "USD";
  duration: string;
  learningOutcomes: string[];
  modules: CourseModule[];
  attachments: string[];
  enrollmentLimit: number;
  enrolled: number;
  organizerName: string;
  organizerAvatar: string;
  status: ListingStatus;
  rating: number;
};

export type TicketOrder = {
  id: string;
  eventId: string;
  eventTitle: string;
  attendeeName: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  amount: number;
  currency: "RWF" | "USD";
  ticketId: string;
  qrPayload: string;
  createdAt: string;
};

export type AnalyticsSummary = {
  totalRevenue: number;
  platformRevenue: number;
  organizerRevenue: number;
  platformFeeRate: number;
  totalUsers: number;
  totalEvents: number;
  totalCourses: number;
  activeOrganizers: number;
  monthlyGrowth: number;
  ticketSales: number;
};
