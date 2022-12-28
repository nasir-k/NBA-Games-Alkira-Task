import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import useFetch from "../../hooks/useFetch";
import { IMatch, IRow } from "../Table/tableTypes";

const OffCanvas = ({
  selectedRow,
  show,
  closeOffCanvas,
}: {
  selectedRow: IRow;
  show: boolean;
  closeOffCanvas: () => void;
}) => {
  const { data: allGames, isLoading } = useFetch(
    `https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${selectedRow.id}`
  );

  const allGamesSortedByDateAscending = (allGames as IMatch[]).sort(
    (currentGame, nextGame) =>
      Date.parse(currentGame.date) - Date.parse(nextGame.date)
  );

  return (
    <Offcanvas
      show={show}
      onHide={closeOffCanvas}
      placement="end"
      style={{ width: "40rem" }}
    >
      <Offcanvas.Header closeButton style={{ background: "#d7dfe5" }}>
        <Offcanvas.Title>{selectedRow.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{
            fontSize: "1.25rem",
            marginBottom: "0.5rem",
          }}
        >
          Team Full Name: {selectedRow.full_name}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: "1.25rem",
          }}
        >
          <span style={{ marginRight: "1rem" }}>Total Games in 2021 : </span>
          {isLoading ? (
            <Spinner animation="grow" />
          ) : (
            allGamesSortedByDateAscending.length
          )}
        </div>
        {isLoading ? (
          <Alert
            className="d-flex justify-content-center align-items-center text-uppercase text-truncate"
            variant="secondary"
            style={{ height: "3.5rem", cursor: "pointer", marginTop: "2rem" }}
          >
            <Spinner animation="border" />
          </Alert>
        ) : (
          <Accordion style={{ marginTop: "2rem" }}>
            {allGamesSortedByDateAscending.map((match) => (
              <Accordion.Item eventKey={match.id.toString()}>
                <Accordion.Header>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingRight: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    <span>
                      {match.home_team.full_name} vs{" "}
                      {match.visitor_team.full_name}
                    </span>
                    <span>{match.date.split("T")[0]}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "50%" }}>Winner</div>
                    <div style={{ width: "50%" }}>
                      {match.home_team_score
                        ? match.home_team.name
                        : match.visitor_team.name}
                    </div>
                  </div>
                  <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "50%" }}>Home Team</div>
                    <div style={{ width: "50%" }}>{match.home_team.name}</div>
                  </div>
                  <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "50%" }}>Home Team Score</div>
                    <div style={{ width: "50%" }}>{match.home_team_score}</div>
                  </div>
                  <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "50%" }}>Visitor Team</div>
                    <div style={{ width: "50%" }}>
                      {match.visitor_team.name}
                    </div>
                  </div>
                  <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "50%" }}>Visitor Team Score</div>
                    <div style={{ width: "50%" }}>
                      {match.visitor_team_score}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvas;
