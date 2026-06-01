import React from "react";
import image from "../../assets/images/image492.png";
import addProp from "../../assets/images/addProp.png";
import { useNavigate } from "react-router-dom";
const AdminProperties = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div>
        <div>
          <div className="text-center py-16 text-gray-400">
            <div className="flex flex-col items-center gap-2">
              <img src={image} alt="" />
              <p className="font-medium text-gray-600">Nothing here,</p>
              <p className="font-semibold text-gray-800">
                List property to get started
              </p>
              <p className="text-xs text-gray-400 max-w-xs text-center">
                "You don't have any properties listed or tour requests yet.
                Start by adding your first property to get started".
              </p>
              <button
                onClick={() => navigate("/admin/properties/add")}
                className="mt-4 bg-[#7065F0] cursor-pointer text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#5a51d4]  flex items-center gap-2"
              >
                Add New Property
                <img src={addProp} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminProperties;
