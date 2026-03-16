"use client";

import Link from "next/link";
import Button from "../Button";

interface OwnedProfileActionsProps {
  className?: string;
}

export default function OwnedProfileActions({
  className = "",
}: OwnedProfileActionsProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Link href="/profile/edit">
        <Button btnStyle="primaryOutline">Edit Profile</Button>
      </Link>
    </div>
  );
}