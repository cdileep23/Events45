import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

enum Category {
  CONFERENCE = "Conference",
  WORKSHOP = "Workshop",
  DEVELOPMENT = "Development",
  CONCERT = "Concert",
  CODING = "Coding",
  COLLEGE_FEST = "College Fest",
  COMMUNITY_FAIR = "Community Fair"
}

type DropDownProps = {
    value?: string;
    onChangeHandler: (value: string) => void;
}

const DropDown = ({ value, onChangeHandler }: DropDownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger >
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Category).map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default DropDown