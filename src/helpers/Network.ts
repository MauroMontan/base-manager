
import { Deta, Base } from "deta"
import { Project } from "../interfaces/Project.ts";

export class Network {

  private deta;
  public projects;

  constructor() {
    this.projects = Base("projects")
    this.deta = Deta()
  }

  setNewProject(projectKey: string) {
    this.deta = Deta(projectKey)
    console.log(this.deta)
  }

  async fetchData(baseName: string): Promise<any> {
    return (await this.deta.Base(baseName).fetch({})).items
  }

  addNewProject(project: Project) {

    this.projects.insert({
      label: project.label,
      projectkey: project.projectKey
    })
  }

  async addBaseToProject(project: any, newBaseName: string) {
    let bases = project["bases"]
    if (bases === undefined) {
      bases = []
    }
    bases.push(newBaseName)
    await this.projects.put({
      projectkey: project["projectkey"],
      label: project["label"],
      bases
    }, project["key"])
  }

  async getProjectList(): Promise<any> {
    let projectList = await this.projects.fetch({})

    return projectList.items

  }
}