const LandlordInfoCard = ({ firstName, lastName, email, phone, image }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xl">
      <div className="p-1 flex justify-center font-semibold border-b border-gray-300">
        <p>Your landlord</p>
      </div>
      <div className="flex gap-4 p-2">
      <img
        src={image}
        alt="Landlord"
        className="w-14 h-14 rounded-full object-cover border border-gray-200"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-slate-800">
          {firstName} {lastName}
        </h3>

        <p className="text-sm text-slate-600">
          📧 {email}
        </p>

        <p className="text-sm text-slate-600">
          📞 {phone}
        </p>
      </div></div>
    </div>
  );
};

export default LandlordInfoCard;
