"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../../components/ui/accordion";
import { Button } from "../../../../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useAccommodationStore } from "../../../../../../store/useAccommodationStore";
import { toast } from "react-hot-toast";

function AddAddress() {
  const { selectedAccommodation, setSelectedAccommodation } = useAccommodationStore();
  const [address, setAddress] = useState({
    number: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    district: "",
    city: "",
    stateProvinceRegion: "",
    country: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasExistingAddress, setHasExistingAddress] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalAddress, setOriginalAddress] = useState({});

  // Load existing address when a hotel is selected
  useEffect(() => {
    if (!selectedAccommodation) return;

    // Pre-fill form with existing address if available
    if (selectedAccommodation.address) {
      const currentAddress = {
        number: selectedAccommodation.address.number || "",
        addressLine1: selectedAccommodation.address.addressLine1 || "",
        addressLine2: selectedAccommodation.address.addressLine2 || "",
        zipCode: selectedAccommodation.address.zipCode || "",
        district: selectedAccommodation.address.district || "",
        city: selectedAccommodation.address.city || "",
        stateProvinceRegion: selectedAccommodation.address.stateProvinceRegion || "",
        country: selectedAccommodation.address.country || "",
        latitude: selectedAccommodation.address.latitude?.toString() || "",
        longitude: selectedAccommodation.address.longitude?.toString() || "",
      };

      setAddress(currentAddress);
      setOriginalAddress(currentAddress);
      setHasExistingAddress(true);
      setIsEditMode(false);
    } else {
      // Reset form if no address exists
      resetForm();
    }
  }, [selectedAccommodation]);

  const resetForm = () => {
    setAddress({
      number: "",
      addressLine1: "",
      addressLine2: "",
      zipCode: "",
      district: "",
      city: "",
      stateProvinceRegion: "",
      country: "",
      latitude: "",
      longitude: "",
    });
    setOriginalAddress({});
    setHasExistingAddress(false);
    setIsEditMode(false);
    setError(null);
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Enable edit mode
  const handleEdit = () => {
    setIsEditMode(true);
  };

  // Cancel edit and revert to original values
  const handleCancel = () => {
    setAddress(originalAddress as typeof address);
    setIsEditMode(false);
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAccommodation) {
      setError("Please select a hotel first");
      return;
    }
    
    // Validate required fields
    const requiredFields = ["addressLine1", "zipCode", "city", "country"];
    const missingFields = requiredFields.filter(field => !address[field as keyof typeof address]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/hotel/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelId: selectedAccommodation.id,
          ...address,
          latitude: address.latitude ? parseFloat(address.latitude) : null,
          longitude: address.longitude ? parseFloat(address.longitude) : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save address");
      }

      const data = await response.json();
      
      // Update the form and state with the returned data
      const updatedAddress = {
        number: data.number || "",
        addressLine1: data.addressLine1 || "",
        addressLine2: data.addressLine2 || "",
        zipCode: data.zipCode || "",
        district: data.district || "",
        city: data.city || "",
        stateProvinceRegion: data.stateProvinceRegion || "",
        country: data.country || "",
        latitude: data.latitude?.toString() || "",
        longitude: data.longitude?.toString() || "",
      };
      
      setAddress(updatedAddress);
      setOriginalAddress(updatedAddress);
      setHasExistingAddress(true);
      setIsEditMode(false);
      
      // Update the selectedAccommodation in the store
      if (selectedAccommodation) {
        setSelectedAccommodation({
          ...selectedAccommodation,
          address: data,
          addressId: data.id
        });
      }
      
      toast.success(hasExistingAddress ? "Address updated successfully" : "Address added successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Delete address
  const handleDelete = async () => {
    if (!selectedAccommodation) {
      setError("Please select a hotel first");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/hotel/address?hotelId=${selectedAccommodation.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete address");
      }

      resetForm();
      
      // Update the selectedAccommodation in the store
      if (selectedAccommodation) {
        setSelectedAccommodation({
          ...selectedAccommodation,
          address: undefined,
          addressId: undefined
        });
      }
      
      toast.success("Address deleted successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // List of form fields with their properties
  const formFields = [
    { id: "number", label: "Number" },
    { id: "addressLine1", label: "Address Line 1", required: true },
    { id: "addressLine2", label: "Address Line 2" },
    { id: "zipCode", label: "Zip Code", required: true },
    { id: "district", label: "District" },
    { id: "city", label: "City", required: true },
    { id: "stateProvinceRegion", label: "State/Province/Region" },
    { id: "country", label: "Country", required: true },
    { id: "latitude", label: "Latitude" },
    { id: "longitude", label: "Longitude" },
  ];

  return (
    <Accordion type="single" collapsible className="p-4 border rounded-lg">
      <AccordionItem value="address">
        <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">
          Address
        </AccordionTrigger>
        <AccordionContent className="px-4 py-6 bg-white rounded-b-lg border border-t-0 border-gray-200">
          {!selectedAccommodation ? (
            <div className="p-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md">
              Please select a hotel first to manage its address.
            </div>
          ) : (
            <>
              {hasExistingAddress && !isEditMode ? (
                <div className="mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h3 className="font-semibold text-lg mb-2">Current Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formFields.map(({ id, label }) => (
                        <div key={id} className="mb-2">
                          <span className="font-medium text-gray-700">{label}:</span>{" "}
                          <span>{address[id as keyof typeof address] || "—"}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      <Button 
                        type="button" 
                        onClick={handleEdit}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Edit Address
                      </Button>
                      <Button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete Address
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formFields.map(({ id, label, required }) => (
                      <div key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                          {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          id={id}
                          type="text"
                          value={address[id as keyof typeof address]}
                          onChange={(e) => handleInputChange(id, e.target.value)}
                          placeholder={`Enter ${label.toLowerCase()}`}
                          className="w-full p-2 border rounded-lg"
                          required={required}
                          disabled={loading}
                        />
                      </div>
                    ))}
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      disabled={loading} 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {hasExistingAddress ? "Update Address" : "Add Address"}
                    </Button>

                    {isEditMode && (
                      <Button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AddAddress;