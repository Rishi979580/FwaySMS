import { useState, useEffect } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { getDatabase, ref, get } from "firebase/database";
import { BsEnvelopeOpen, BsBarChartFill } from "react-icons/bs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AdminPageDashboard() {
  const [enquiriesData, setEnquiriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const enquiriesRef = ref(db, "EnquiriesData");

    const fetchData = async () => {
      try {
        const enquiriesSnapshot = await get(enquiriesRef);

        if (enquiriesSnapshot.exists()) {
          const enquiriesData = Object.values(enquiriesSnapshot.val());
          setEnquiriesData(enquiriesData);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTotalCount = (data) => data.length;

  const getTodayCount = (data) => {
    const today = new Date().setHours(0, 0, 0, 0); // Today's date at 00:00:00
    return data.filter((item) => {
      const itemDate = new Date(item.timestamp); // Convert timestamp to Date object
      return itemDate >= today;
    }).length;
  };

  const getMostRequestedService = (data) => {
    if (data.length === 0) {
      return "No Data Available";
    }

    const serviceCounts = data.reduce((acc, enquiry) => {
      acc[enquiry.service] = (acc[enquiry.service] || 0) + 1;
      return acc;
    }, {});

    const mostRequestedService = Object.keys(serviceCounts).reduce((a, b) =>
      serviceCounts[a] > serviceCounts[b] ? a : b
    );

    return mostRequestedService;
  };

  const totalEnquiries = getTotalCount(enquiriesData);
  const todayEnquiries = getTodayCount(enquiriesData);
  const mostRequestedService = getMostRequestedService(enquiriesData);

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">Error loading content: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <main className="main-container">
      <h2 className="mb-4 bg-dark p-3 text-center text-white">DASHBOARD</h2>

      <div className="main-cards">
        <div className="card bg-success">
          <div className="card-inner">
            <h3>Total Enquiries</h3>
            <BsEnvelopeOpen className="card_icon" />
          </div>
          <h1>{totalEnquiries}</h1>
          <p>Manage and track all enquiries in one place.</p>
        </div>
        <div className="card bg-secondary">
          <div className="card-inner">
            <h3>Today's Enquiries</h3>
            <BsEnvelopeOpen className="card_icon" />
          </div>
          <h1>{todayEnquiries}</h1>
          <p>New enquiries received today.</p>
        </div>
        <div className="card bg-info">
          <div className="card-inner">
            <h3>Most Requested Service</h3>
            <BsBarChartFill className="card_icon" />
          </div>
          <h1>{mostRequestedService}</h1>
          <p>The service most frequently requested in enquiries.</p>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={500}
            height={300}
            data={enquiriesData.map((item) => ({
              date: new Date(item.timestamp).toLocaleDateString(), // Convert timestamp to a readable date
              count: 1,
            }))}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminPageDashboard;
