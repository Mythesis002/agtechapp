import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileInfo } from "@/components/profile/profile-info"
import { OrderHistory } from "@/components/profile/order-history"
import { AddressBook } from "@/components/profile/address-book"
import { PaymentMethods } from "@/components/profile/payment-methods"
import { ProfileSidebar } from "@/components/profile/profile-sidebar"

export default function ProfilePage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar - Visible on desktop */}
        <div className="hidden md:block">
          <ProfileSidebar />
        </div>

        {/* Tabs - Visible on mobile */}
        <div className="md:col-span-3">
          <Tabs defaultValue="profile" className="md:hidden mb-8">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileInfo />
            </TabsContent>

            <TabsContent value="orders">
              <OrderHistory />
            </TabsContent>

            <TabsContent value="addresses">
              <AddressBook />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentMethods />
            </TabsContent>
          </Tabs>

          {/* Desktop view - Always show profile info */}
          <div className="hidden md:block">
            <ProfileInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

