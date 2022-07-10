import { Layout, Typography, Card, Row, Col, Spin, Input } from "antd";
import { getBooks } from "../api/book";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagingState, setPagingState] = useState({
    currentPage: 1,
    pageSize: 8,
    total: 0,
  });
  const [filter, setFilter] = useState("");

  const onFilter = (book) =>
    book.name.includes(filter) ||
    book.Category.name.includes(filter) ||
    !filter;

  useEffect(() => {
    setLoading(true);
    getBooks(pagingState)
      .then(({ data }) => {
        setBooks(data.books);
        setPagingState((prev) => ({
          ...prev,
          currentPage: Number(data.currentPage),
          total: data.total,
        }));
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagingState.currentPage]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />;
      </div>
    );

  return (
    <Layout>
      <Layout.Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography.Title level={3}>Book Management</Typography.Title>
      </Layout.Header>

      <Layout.Content style={{ marginTop: "5rem" }}>
        <Row gutter={[16, 16]} style={{ padding: "1rem" }}>
          <Col span={24}>
            <Input
              placeholder="Filter"
              onChange={(e) => setFilter(e.target.value)}
            />
          </Col>
          {books.filter(onFilter).map((book) => (
            <Col
              span={6}
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                hoverable
                cover={
                  <div
                    style={{
                      overflow: "hidden",
                      height: "660px",
                      width: "100%",
                    }}
                  >
                    <img
                      style={{ height: "100%" }}
                      alt="example"
                      src={book.image}
                    />
                  </div>
                }
              >
                <Card.Meta
                  style={{ position: "relative", bottom: 0 }}
                  title={book.name}
                  description={book.Category.name}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Layout.Content>
    </Layout>
  );
};
