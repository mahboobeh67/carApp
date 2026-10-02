"use client";

interface ServiceCheckboxGroupProps {
  label: string;
  services: string[];
  selectedServices: string[];
  onToggleService: (service: string) => void;
}

export function ServiceCheckboxGroup({
  label,
  services,
  selectedServices,
  onToggleService,
}: ServiceCheckboxGroupProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service);
          return (
            <label
              key={service}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all duration-200 ${
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-800"
                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleService(service)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium">{service}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
