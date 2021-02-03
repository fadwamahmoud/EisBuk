import React from "react";
import BookingsByDay from "./BookingsByDay";

export default {
  title: "Bookings by day",
  component: BookingsByDay,
};

const Template = (args) => <BookingsByDay {...args} />;
export const Empty = Template.bind({});
Empty.args = {
  bookingDayInfo: [],
};

export const OneSlot = Template.bind({});
OneSlot.args = {
  bookingDayInfo: [
    {
      time: "11:00",
      category: "agonismo",
      type: "ice",
      id: "foo",
      users: [],
    },
  ],
};

export const ManySlots = Template.bind({});
ManySlots.args = {
  bookingDayInfo: [
    {
      time: "11:00",
      category: "agonismo",
      type: "ice",
      id: "foo",
      users: [{ name: "Saul", surname: "Goodman", id: "saul" }],
    },
    {
      time: "12:00",
      category: "agonismo",
      type: "ice",
      id: "bar",
      users: [
        { name: "Walter", surname: "White", id: "walt" },
        { name: "Gus", surname: "Fring", id: "gus" },
        { name: "Saul", surname: "Goodman", id: "saul" },
      ],
      absentees: {
        gus: true,
      },
    },
    {
      time: "15:00",
      category: "agonismo",
      type: "ice",
      id: "baz",
      users: [],
    },
    {
      time: "16:30",
      category: "agonismo",
      type: "ice",
      id: "bat",
      users: [
        { name: "Walter", surname: "White", id: "walter" },
        { name: "Jesse", surname: "Pinkman", id: "jesse" },
      ],
    },
  ],
};

export const ManySlotsWithAbsentee = Template.bind({});
ManySlotsWithAbsentee.args = ManySlots.args;
ManySlotsWithAbsentee.argTypes = {
  markAbsentee: { action: "Absentee marked" },
};
