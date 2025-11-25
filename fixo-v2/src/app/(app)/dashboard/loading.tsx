import { DashboardSkeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="container py-8">
      <DashboardSkeleton />
    </div>
  );
}
