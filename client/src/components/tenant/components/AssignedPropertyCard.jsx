import { Home } from "lucide-react";

const AssignedPropertyCard = ({
  unitName,
  propertyName,
  address,
  agreementFrom,
}) => { 
  const quote = "Home is where your story begins."
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/2 relative">
        <img
          src={"https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
          alt="Assigned Property"
          className="w-full h-64 md:h-full object-cover md:rounded-l-xl"
        />
        <span
          className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-xl
          bg-green-600 text-white border border-white"
        >
          {"Occupied"}
        </span>
      </div>
      <div className="md:w-1/2 flex flex-col justify-between p-6">
        <div className="space-y-2">
          <h2 className="flex text-2xl font-semibold text-slate-800"><Home className="w-8 h-8 p-1 text-indigo-600" /> {unitName}</h2>
          <p className="text-slate-600">{propertyName}</p>
          <p className="text-slate-500 text-sm">{address}</p>
          <p className="text-slate-500 text-sm mt-2">
            Agreement from: <span className="font-medium">{agreementFrom}</span>
          </p>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-400">
          <p className="italic text-slate-700 text-sm flex items-center gap-2">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignedPropertyCard;
