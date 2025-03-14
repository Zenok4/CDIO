"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react/dist";
import { Loader2, MapPinnedIcon, Store } from "lucide-react";

const PharmacyDetailPage = () => {
  const id = useParams();

  const [pharmacy, setPharmacys] = useState({});
  const [loading, setLoading] = useState(true);

  const supabase = useSupabaseClient();

  const fetchPharmacys = async () => {
    const { data, error } = await supabase
      .from("pharmacys")
      .select("*")
      .eq("id", id.pharmacyId);
    if (error) {
      console.error(error.message);
      return null;
    } else {
      setPharmacys(data?.[0]);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPharmacys();
    setLoading(false);
  }, [id]);

  return !loading ? (
    <div className="flex flex-col items-center mt-20 pb-20">
      {/* Header Section */}
      <div className="bg-green-500 text-white w-full text-center py-4 rounded-t-2xl flex items-center justify-center gap-2">
        <Store className="w-5 h-5" />
        <h1 className="text-xl font-bold">Thông Tin Tiệm Thuốc</h1>
      </div>

      {/* Image Section */}
      <div className="bg-green-100 rounded-b-2xl w-full flex flex-col items-center justify-center relative p-5">
        <img
          className="w-[250px] object-cover rounded-lg shadow-md"
          src={pharmacy?.img}
          alt={pharmacy?.name}
        />
      </div>

      {/* Pharmacy Info Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md border border-gray-300">
        <h2 className="text-lg font-bold text-gray-800 uppercase flex items-center gap-2">
          {pharmacy?.name}
        </h2>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed flex items-center gap-2">
          <MapPinnedIcon className="w-5 h-5" /> {pharmacy?.local}
        </p>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
        <Loader2 className="w-10 h-10 animate-spin text-green-500" />
      </div>
    </div>
  );
};

export default PharmacyDetailPage;
