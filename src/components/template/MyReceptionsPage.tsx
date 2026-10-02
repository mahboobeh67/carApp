
"use client";

import React from "react";
import DashboardCard from "@/module/DashboardCard";
import type { IReceptionCard } from "@/module/ReceptionCard";

interface MyReceptionsPageProps {
  receptions: IReceptionCard[];
}

function MyReceptionsPage({ receptions }: MyReceptionsPageProps) {
  return (
    <div className="w-full space-y-4" dir="rtl">
      {!receptions?.length ? (
        <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center font-medium text-amber-900">
          هنوز هیچ نوبتی ثبت نشده است.
        </p>
      ) : (
        receptions.map((item) => (
          <DashboardCard key={item._id} data={item} />
        ))
      )}
    </div>
  );
}

export default MyReceptionsPage;
