import { useState, useEffect } from "react";

type ContactCardProps = {
  id: number;
  name: string;
  dob: string;
  grossSalary: number;
};

const ContactCard = ({ id, name, dob, grossSalary }: ContactCardProps) => {
  const calculateAge = (dobString: string): number => {
    if (!dobString) return 0;
    const parts = dobString.split("/").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return 0;

    const [month, day, year] = parts;
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const [isFiler, setIsFiler] = useState<boolean>(true);
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [age, setAge] = useState<number>(0);
  const [netSalary, setNetSalary] = useState<number>(grossSalary - grossSalary * 0.11);

  useEffect(() => {
    setAge(calculateAge(dob));
  }, [dob]);

  const handleFilerChange = (checked: boolean) => {
    setIsFiler(checked);
    const taxRate = checked ? 0.11 : 0.22;
    setNetSalary(grossSalary - grossSalary * taxRate);
  };

  const toggleStatus = () => {
    setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  return (
    <div className="w-[400px] bg-white rounded-2xl shadow-lg p-6 font-sans mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-500">ID: {id}</p>
          </div>
        </div>
        <p className="text-gray-700 font-medium">Age: {age}</p>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-gray-500">Date of Birth</p>
        <p className="text-gray-800 font-medium">{dob}</p>

        <p className="text-sm text-gray-500 mt-2">Status</p>
        <button
          onClick={toggleStatus}
          className={`px-4 py-1 text-sm rounded-md font-medium transition-all ${
            status === "Active"
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          {status}
        </button>

        <div className="mt-3">
          <p className="text-sm text-gray-500">Gross Salary</p>
          <p className="font-medium text-gray-800">{grossSalary.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Net Salary (after {isFiler ? "11%" : "22%"} tax)
          </p>
          <p className="font-medium text-gray-800">{netSalary.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Is Filer</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isFiler}
              onChange={(e) => handleFilerChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <p className="text-sm text-gray-500">DOB: {dob}</p>
      </div>
    </div>
  );
};

export default ContactCard;
