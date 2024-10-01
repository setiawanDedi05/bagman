"use client";

import { Card } from "@/components/ui/card";
import {
  LabelTaskEnum,
  PriorityTaskEnum,
  StatusTaskEnum,
} from "@/services/dto/task-dto";
import { User } from "@/services/dto/user";
import { userService } from "@/services/user/user-service";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ControllerRenderProps } from "react-hook-form";

interface SelectPeopleProps {
  input: string;
  field: ControllerRenderProps<{
    title: string;
    description?: string;
    status: StatusTaskEnum;
    label: LabelTaskEnum;
    priority: PriorityTaskEnum;
    projectId: string;
    assignees?: string;
  }>;
  setInput: Dispatch<SetStateAction<string>>;
}
export default function SelectPeople({
  input,
  field,
  setInput,
}: SelectPeopleProps) {
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
  }, [input, fetchData]);

  const handleOnclick = useCallback(
    (people: User) => {
      const stringToEvent = { target: { value: people.id } };
      setInput(people.username);
      field.onChange(stringToEvent);
      setPeoples([]);
    },
    [setPeoples, setInput, field]
  );

  if (!peoples.length) {
    return <></>;
  }

  return (
    <Card className="flex flex-col w-[380px]">
      {peoples.map((people: User) => {
        return (
          <div
            key={people.id}
            onClick={() => {
              handleOnclick(people);
            }}
            className="flex justify-between gap-10 hover:bg-mainAccent py-2 px-5"
          >
            <span>{people.username}</span>
            <span>{people.name}</span>
          </div>
        );
      })}
    </Card>
  );
}
