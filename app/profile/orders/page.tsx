import { OrderHistory } from "@/components/profile/order-history"
import { ProfileLayout } from "@/components/profile/profile-layout"

export default function OrdersPage() {
  return (
    <ProfileLayout>
      <OrderHistory />
    </ProfileLayout>
  )
}

