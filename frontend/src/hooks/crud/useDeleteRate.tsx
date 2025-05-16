import axios from "axios";

export function useDeleteRate(
  setExchangeRates: React.Dispatch<React.SetStateAction<any[]>>
) {
  const deleteRate = async (id: number) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovu tečajnicu?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/rates/${id}`);
      setExchangeRates((prev) => prev.filter((rate) => rate.id !== id));
    } catch (error) {
      console.error("Greška:", error);
      alert("Došlo je do greške!");
    }
  };

  return { deleteRate };
}
