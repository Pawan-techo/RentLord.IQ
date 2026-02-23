import { MapPin, Home, Trash2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group">
      <div className="relative h-60 w-full">
        <img
          src={
            property?.image ||
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
          }
          alt={property?.name}
          className="h-full w-full object-cover transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Delete */}
        <button
          onClick={() => onDelete(property._id)}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur border border-gray-300 p-2 rounded-lg text-slate-600 hover:text-red-500 transition cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-800">
          {property?.name}
        </h3>

        <p className="flex items-center gap-1 text-sm text-slate-500 mt-1">
          <MapPin size={14} />
          {property?.address}
          {","} {property.city}
        </p>
        <p className="flex items-center gap-1 text-sm text-slate-500 mt-1">
          {property?.state}
          {"-"} {property?.pincode}
        </p>

        {/* Stats */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Home size={16} />
            <span>
              <strong className="text-slate-800">
                {property?.totalSubProperties}
              </strong>{" "}
              Units
            </span>
          </div>

          {/* CTA */}
          <button
            className="flex items-center gap-1 text-indigo-600 text-sm font-medium hover:gap-2 transition-all cursor-pointer"
            onClick={() =>
              navigate(`/landlord/sub-properties?propertyId=${property?._id}`, {
                state: {
                  propertyId: property._id,
                  propertyName: property.name,
                },
              })
            }
          >
            Sub Properties
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
