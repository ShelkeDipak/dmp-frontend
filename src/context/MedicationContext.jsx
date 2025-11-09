import { createContext, useContext, useState } from "react";

const MedicationContext = createContext();

export const MedicationProvider = ({ children }) => {
  const [medications, setMedications] = useState([]);

  const addMedication = (med) => {
    setMedications((prev) => [...prev, { ...med, status: "Take" }]);
  };

  const toggleMedicationStatus = (index) => {
    setMedications((prev) =>
      prev.map((m, i) =>
        i === index
          ? { ...m, status: m.status === "Taken" ? "Take" : "Taken" }
          : m
      )
    );
  };

  return (
    <MedicationContext.Provider
      value={{ medications, addMedication, toggleMedicationStatus }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedications = () => {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error("useMedications must be used within a MedicationProvider");
  }
  return context;
};
