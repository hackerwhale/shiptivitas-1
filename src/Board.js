// Board.js

import React from "react";
import Dragula from "dragula";
import "dragula/dist/dragula.css";
import Swimlane from "./Swimlane";
import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: this.getClients(),
    };
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    };
  }

  componentDidMount() {
    this.initializeDragAndDrop();
  }

  initializeDragAndDrop() {
    const containers = Object.values(this.swimlanes).map((ref) => ref.current);
    this.dragula = Dragula(containers, {
      revertOnSpill: true,
    });

    this.dragula.on("drop", (el, target) => {
      const taskId = el.dataset.taskId;
      const newStatus = target.dataset.status;
      this.updateTaskStatus(taskId, newStatus);
    });
  }

  updateTaskStatus(taskId, newStatus) {
    const updatedClients = this.state.clients.map((client) => {
      if (client.id === taskId) {
        client.status = newStatus;
        this.setColorBasedOnStatus(client); // Call color update logic
      }
      return client;
    });
    this.setState({ clients: updatedClients });
  }

  setColorBasedOnStatus(client) {
    switch (client.status) {
      case "backlog":
        client.backgroundColor = "lightgray";
        break;
      case "in-progress":
        client.backgroundColor = "blue";
        break;
      case "complete":
        client.backgroundColor = "green";
        break;
      default:
        client.backgroundColor = "white";
    }
  }

  getClients() {
    return [
      ['1', 'Stark, White and Abbott', 'Cloned Optimal Architecture', 'in-progress'],
          ['2', 'Wiza LLC', 'Exclusive Bandwidth-Monitored Implementation', 'complete'],
          ['3', 'Nolan LLC', 'Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
          ['4', 'Thompson PLC', 'Streamlined Regional Knowledgeuser', 'in-progress'],
          ['5', 'Walker-Williamson', 'Team-Oriented 6Thgeneration Matrix', 'in-progress'],
          ['6', 'Boehm and Sons', 'Automated Systematic Paradigm', 'backlog'],
          ['7', 'Runolfsson, Hegmann and Block', 'Integrated Transitional Strategy', 'backlog'],
          ['8', 'Schumm-Labadie', 'Operative Heuristic Challenge', 'backlog'],
          ['9', 'Kohler Group', 'Re-Contextualized Multi-Tasking Attitude', 'backlog'],
          ['10', 'Romaguera Inc', 'Managed Foreground Toolset', 'backlog'],
          ['11', 'Reilly-King', 'Future-Proofed Interactive Toolset', 'complete'],
          ['12', 'Emard, Champlin and Runolfsdottir', 'Devolved Needs-Based Capability', 'backlog'],
          ['13', 'Fritsch, Cronin and Wolff', 'Open-Source 3Rdgeneration Website', 'complete'],
          ['14', 'Borer LLC', 'Profit-Focused Incremental Orchestration', 'backlog'],
          ['15', 'Emmerich-Ankunding', 'User-Centric Stable Extranet', 'in-progress'],
          ['16', 'Willms-Abbott', 'Progressive Bandwidth-Monitored Access', 'in-progress'],
          ['17', 'Brekke PLC', 'Intuitive User-Facing Customerloyalty', 'complete'],
          ['18', 'Bins, Toy and Klocko', 'Integrated Assymetric Software', 'backlog'],
          ['19', 'Hodkiewicz-Hayes', 'Programmable Systematic Securedline', 'backlog'],
          ['20', 'Murphy, Lang and Ferry', 'Organized Explicit Access', 'backlog'],
    ].map((companyDetails) => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
      
    }));
  }

  renderSwimlane(name, status, ref) {
    const clients = this.state.clients.filter(
      (client) => client.status === status
    );
    return <Swimlane name={name} clients={clients} dragulaRef={ref} />;
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane(
                "Backlog",
                "backlog",
                this.swimlanes.backlog
              )}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane(
                "In Progress",
                "in-progress",
                this.swimlanes.inProgress
              )}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane(
                "Complete",
                "complete",
                this.swimlanes.complete
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
