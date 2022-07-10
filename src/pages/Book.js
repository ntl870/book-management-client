import { useParams } from "react-router-dom";
import { Layout, Typography, Row, Col, Image, Button, Spin } from "antd";
import { getBookById } from "../api/book";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";

export const Book = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getBookById(id)
      .then(({ data }) => {
        setBook(data.book);
      })
      .finally(() => setLoading(false));
  }, [id]);
  console.log(book);
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
    <Layout style={{ height: "100vh" }}>
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
      <Layout.Content style={{ marginTop: "4.1rem" }}>
        <Row>
          <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
            <Image src={book.image} height={660} />
          </Col>
          <Col span={12} style={{ padding: "2rem" }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Typography.Title level={3}>Name</Typography.Title>
                <Typography.Text>{book.name}</Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Title level={3}>Category</Typography.Title>
                <Typography.Paragraph>
                  {book?.Category?.name}
                </Typography.Paragraph>
              </Col>
              <Col span={24}>
                <Typography.Title level={3}>Description</Typography.Title>
                <Typography.Paragraph>{book.description}</Typography.Paragraph>
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  href={book.downloadUrl}
                >
                  Download Book
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};
