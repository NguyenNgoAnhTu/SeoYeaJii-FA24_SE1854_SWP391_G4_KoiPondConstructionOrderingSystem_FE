import { useEffect, useState } from "react";

function ServiceProgressTable() {
  interface ServiceProgress {
    serviceProgressID: string;
    serviceDetail: {
      serviceDetailId: string;
    };
    startDate: string;
    endDate?: string;
    step?: string;
    isConfirmed: boolean;
    isPaid: boolean;
    isActive: boolean;
  }

  const [serviceProgressData, setServiceProgressData] = useState<
    ServiceProgress[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8080/api/service-progress",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setServiceProgressData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServiceProgress();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red py-4">
        Error: {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (serviceProgressData.length === 0) {
    return <div className="text-center py-4">No data available.</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="overflow-hidden rounded-lg border border-b-black-27 shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-A0 border">
            <tr>
              {[
                "Index",
                "Service Progress ID",
                "Service Detail ID",
                "Start Date",
                "End Date",
                "Step",
                "Is Confirmed",
                "Is Paid",
                "Is Active",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-black-15 uppercase tracking-wider text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {serviceProgressData.map((service, index) => (
              <tr
                key={service.serviceProgressID}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 text-sm text-black-15 text-center">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-black-15 text-center">
                  {service.serviceProgressID}
                </td>
                <td className="px-6 py-4 text-sm text-black-15 text-center">
                  {service.serviceDetail?.serviceDetailId || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-black-15 text-center">
                  {new Date(service.startDate).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-black-15 text-center">
                  {service.endDate
                    ? new Date(service.endDate).toLocaleString()
                    : "Unfinished"}
                </td>
                <td className="px-6 py-4 text-sm text-black-15 text-center">
                  {service.step || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-black-15 text-center">
                  {service.isConfirmed ? "✔️" : "❌"}
                </td>
                <td className="px-6 py-4 text-sm text-black-15 text-center">
                  {service.isPaid ? "✔️" : "❌"}
                </td>
                <td className="px-6 py-4 text-sm text-black-15 text-center">
                  {service.isActive ? "✔️" : "❌"}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    type="button"
                    className="mx-1 text-white bg-green hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="mx-1 text-white bg-red hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceProgressTable;
