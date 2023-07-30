import React from "react";
import { SimpleInput } from "../common/common";
import Select from "react-select";

interface Props {
  userId: string;
}

export default function Profile({ userId }: Props): JSX.Element {
  return (
    <div className="w-full border">
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 border border-red-500 lg:grid-cols-3">
        <div className="border">
          <div>
            <div>Image</div>
            <div>
              <p>Name</p>
              <p>role</p>
            </div>
          </div>
        </div>
        <div className="row-span-2 border lg:col-span-2">
          <h2>General Information</h2>
          <form>
            <SimpleInput
              label="Name"
              name="name"
              type="text"
              placeholder="Name"
            />
            <SimpleInput
              label="email"
              name="email"
              type="text"
              placeholder="email"
            />
            <Select
              options={[
                { value: "admin", label: "Admin" },
                { value: "developer", label: "Developer" },
                { value: "tester", label: "Tester" },
              ]}
            />
            <button type="submit">Update</button>
          </form>
        </div>
        <div className="border">
          <h2>Language & Time</h2>
          <form>
            <label id="language">Select Language</label>
            <Select
              options={[
                { value: "en", label: "English" },
                { value: "fr", label: "French" },
                { value: "de", label: "German" },
              ]}
              name="language"
              placeholder="English"
              isDisabled={true}
            />
            <label id="timezone">Time zone</label>
            <Select
              options={[
                { value: "GMT", label: "GMT" },
                { value: "GMT+1", label: "GMT+1" },
                { value: "GMT+2", label: "GMT+2" },
              ]}
              name="timezone"
              placeholder="GMT+1"
              isDisabled={true}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
