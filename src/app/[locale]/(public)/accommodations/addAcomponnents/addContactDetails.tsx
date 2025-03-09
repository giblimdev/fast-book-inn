/*model ContactDetails {
  id        String   @id @default(uuid())
  phone     String?
  email     String?
  website   String?
  hotelId   String?
  Hotel     Hotel[]
} */

//src/app/[locale]/(public)/accommodations/addAcomponnents/addContactDetails.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../../components/ui/accordion";
import { Button } from "../../../../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useAccommodationStore } from "../../../../../../store/useAccommodationStore";

function AddContactDetails() {
  const { selectedAccommodation } = useAccommodationStore();
  const [contactDetails, setContactDetails] = useState({
    phone: "",
    email: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing contact details when a hotel is selected
  useEffect(() => {
    if (!selectedAccommodation) return;

    // Pre-fill form with existing contact details if available
    if (selectedAccommodation.contactDetails) {
      setContactDetails({
        phone: selectedAccommodation.contactDetails.phone || "",
        email: selectedAccommodation.contactDetails.email || "",
        website: selectedAccommodation.contactDetails.website || "",
      });
    } else {
      // Reset form if no contact details exist
      setContactDetails({
        phone: "",
        email: "",
        website: "",
      });
    }
  }, [selectedAccommodation]);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setContactDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAccommodation) {
      setError("Please select a hotel first");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/hotel/contactDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelId: selectedAccommodation.id,
          ...contactDetails,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save contact details");
      }

      const data = await response.json();
      setContactDetails({
        phone: data.phone || "",
        email: data.email || "",
        website: data.website || "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete contact details
  const handleDelete = async () => {
    if (!selectedAccommodation) {
      setError("Please select a hotel first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/hotel/contactDetails?hotelId=${selectedAccommodation.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete contact details");
      }

      setContactDetails({ phone: "", email: "", website: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible className="p-4 border rounded-lg">
      <AccordionItem value="contact-details">
        <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">
          Contact Details
        </AccordionTrigger>
        <AccordionContent className="px-4 py-6 bg-white rounded-b-lg border border-t-0 border-gray-200">
          {!selectedAccommodation ? (
            <div className="p-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md">
              Please select a hotel first to manage its contact details.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  value={contactDetails.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={contactDetails.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  id="website"
                  type="text"
                  value={contactDetails.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="Enter website URL"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {contactDetails.phone || contactDetails.email || contactDetails.website ? "Update" : "Add"}
                </Button>

                {(contactDetails.phone || contactDetails.email || contactDetails.website) && (
                  <Button
                    type="button"
                    disabled={loading}
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Delete
                  </Button>
                )}
              </div>
            </form>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AddContactDetails;