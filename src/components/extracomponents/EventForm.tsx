"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DropDown from "./DropDown";
import ImageUpload from "./ImageUpload";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import StyledDateTimePicker from "./StyledDateTimePicker ";

interface EventFormData {
  id?: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  organizerId: string;
  isFree: boolean;
  price: string | null;
  startDateTime: Date;
  endDateTime: Date;
  url: string | null;
  location: string | null;
  slots: string;
  category: Category | string;
}

type FieldErrors = {
  [key in keyof EventFormData]?: string;
};

interface EventFormProps {
  userId: string | null;
  event?: EventFormData;
  type: "Create" | "Update";
}

const EventForm = ({ 
  userId, 
  event, 
  type = "Create", 
}: EventFormProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    thumbnail: "",
    location: "",
    startDateTime: new Date(),
    endDateTime: new Date(),
    category: "",
    price: "",
    isFree: false,
    url: "",
    slots: "",
    organizerId: userId || ""
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 3600000);
    
    if (type === "Create" && !event) {
      setFormData(prev => ({
        ...prev,
        startDateTime: now,
        endDateTime: oneHourLater
      }));
    }
  }, [type, event]);

  useEffect(() => {
    if (event && type === "Update" && isMounted) {
      setFormData({
        ...event,
        startDateTime: event.startDateTime instanceof Date 
          ? event.startDateTime 
          : new Date(event.startDateTime),
        endDateTime: event.endDateTime instanceof Date 
          ? event.endDateTime 
          : new Date(event.endDateTime),
      });
    }
  }, [event, type, isMounted]);

  const validateField = (name: keyof EventFormData, value: any): string => {
    switch (name) {
      case "title":
        return typeof value === 'string' && value.length < 4 
          ? "Title must be at least 4 characters" 
          : "";
      case "description":
        if (typeof value !== 'string') return "";
        if (value.length < 30) return "Description must be at least 30 characters";
        if (value.length > 1000) return "Description must be less than 1000 characters";
        return "";
      case "location":
        if (typeof value !== 'string') return "";
        if (value.length < 3) return "Location must be at least 3 characters";
        if (value.length > 200) return "Location must be less than 200 characters";
        return "";
      case "url":
        if (!value) return "";
        if (typeof value !== 'string') return "URL must be a string";
        if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value)) 
          return "Please enter a valid URL";
        return "";
      case "slots":
        if (typeof value !== 'string') return "Slots must be a string";
        if (value.length < 2) return "Minimum 2 slots should be added";
        if (value.length > 100) return "Maximum 100 slots";
        return "";
      case "price":
        if (formData.isFree) return "";
        if (!value) return "Price is required when event is not free";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    const error = validateField(name as keyof EventFormData, newValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleDateChange = (name: 'startDateTime' | 'endDateTime', value: Date | null) => {
    if (value) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (name === 'startDateTime' && value >= formData.endDateTime) {
        const newEndDate = new Date(value);
        newEndDate.setHours(newEndDate.getHours() + 1);
        setFormData(prev => ({
          ...prev,
          endDateTime: newEndDate
        }));
      }
      
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
        ...(name === 'startDateTime' ? { endDateTime: undefined } : {})
      }));
    }
  };

  const handleImageChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      thumbnail: value
    }));
    
    setErrors(prev => ({
      ...prev,
      thumbnail: undefined
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
    
    setErrors(prev => ({
      ...prev,
      category: value ? undefined : "Category is required"
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    
    (Object.keys(formData) as Array<keyof EventFormData>).forEach(key => {
      if (['title', 'description', 'location', 'url', 'slots', 'price'].includes(key)) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    if (!formData.thumbnail) {
      newErrors.thumbnail = "Event thumbnail is required";
    }
    
    if (formData.endDateTime <= formData.startDateTime) {
      newErrors.endDateTime = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (type === "Create") {
        console.log(formData);
        // Your create event function would go here
      } else {
        console.log(formData);
        // Your update event function would go here
      }
      
      // Uncomment when integrating with server action
      // if (result.success) {
      //   router.refresh();
      //   if (result.event?.id) {
      //     router.push(`/events/${result.event.id}`);
      //   } else {
      //     router.push('/events');
      //   }
      // } else {
      //   setServerError(result.error || "Failed to save event. Please try again.");
      // }
    } catch (error) {
      console.error("Form submission error:", error);
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {serverError}
        </div>
      )}
      
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="w-full md:w-1/2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
          <Input
            id="title"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="input-field w-full"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="w-full md:w-1/2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <DropDown
            onChangeHandler={handleCategoryChange}
            value={formData.category}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <Textarea
          id="description"
          name="description"
          placeholder="Event Description"
          value={formData.description || ""}
          onChange={handleChange}
          className="input-field"
          rows={5}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Thumbnail</label>
        <ImageUpload
          endpoint="imageUploader"
          value={formData.thumbnail || ""}
          onChange={handleImageChange}
        />
        {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <Input
          id="location"
          name="location"
          placeholder="Event Location"
          value={formData.location || ""}
          onChange={handleChange}
          className="input-field"
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <StyledDateTimePicker
            label="Start Date & Time"
            value={formData.startDateTime}
            onChange={(value) => handleDateChange('startDateTime', value)}
            error={errors.startDateTime}
          />
        </div>

        <div className="w-full sm:w-1/2">
          <StyledDateTimePicker
            label="End Date & Time"
            value={formData.endDateTime}
            onChange={(value) => handleDateChange('endDateTime', value)}
            minDate={formData.startDateTime}
            error={errors.endDateTime}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Checkbox
          id="isFree"
          checked={formData.isFree}
          onCheckedChange={(checked: boolean) => {
            setFormData(prev => ({
              ...prev,
              isFree: checked,
              price: checked ? null : prev.price
            }));
            
            if (checked) {
              setErrors(prev => ({
                ...prev,
                price: undefined
              }));
            }
          }}
        />
        <Label htmlFor="isFree" className="cursor-pointer">This is a free event</Label>
      </div>

      {!formData.isFree && (
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <Input
            id="price"
            name="price"
            placeholder="Price"
            value={formData.price || ""}
            onChange={handleChange}
            type="text"
            className="input-field"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
      )}

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Event URL (optional)</label>
        <Input
          id="url"
          name="url"
          placeholder="Event URL (optional)"
          value={formData.url || ""}
          onChange={handleChange}
          className="input-field"
        />
        {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
      </div>

      <div>
        <label htmlFor="slots" className="block text-sm font-medium text-gray-700 mb-1">Available Slots</label>
        <Input
          id="slots"
          name="slots"
          placeholder="Available Slots"
          value={formData.slots}
          onChange={handleChange}
          className="input-field"
        />
        {errors.slots && <p className="text-red-500 text-sm mt-1">{errors.slots}</p>}
      </div>

      <Button
        type="submit"
        className="w-full py-4 sm:py-6 text-base sm:text-lg mt-6 bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : `${type} Event`}
      </Button>
    </form>
  );
};

export default EventForm;