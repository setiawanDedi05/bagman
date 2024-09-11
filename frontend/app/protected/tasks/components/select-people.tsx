"use client";

import { User } from "@/services/dto/user";
import { userService } from "@/services/user/user-service";
import { useCallback, useEffect, useState } from "react";

interface SelectPeopleProps {
  input: string;
}
export default function SelectPeople({ input }: SelectPeopleProps) {
  const [peoples, setPeoples] = useState<User[]>([]);

  const fetchData = useCallback(async () => {
    if (input.length < 3) {
      setPeoples([]);
      return;
    }
    try {
      const response = await userService.searchPeople(input);
      setPeoples(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [input, setPeoples]);

  useEffect(() => {
    fetchData();
  }, [input]);

  return (
    <div className="flex flex-col w-[380px] p-5">
      {peoples.map((people: User) => {
        return (
          <div key={people.id} className="flex justify-between gap-10">
            <span>{people.username}</span>
            <span>{people.name}</span>
          </div>
        );
      })}
    </div>
  );
}
