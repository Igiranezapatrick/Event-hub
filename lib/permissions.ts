import type { UserRole } from "@/lib/types";

const roleRank: Record<UserRole, number> = {
  super_admin: 3,
  organizer: 2,
  attendee: 1,
};

export function canManage(role: UserRole, target: UserRole) {
  return roleRank[role] >= roleRank[target];
}

export function isPrivileged(role: UserRole) {
  return role === "super_admin" || role === "organizer";
}

