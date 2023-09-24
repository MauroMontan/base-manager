
export class CommandBuilder {

  public command: string
  public identifier: string
  public data: string


  constructor(query: string) {
    // /add-project <PROJECTKEY> <LABEL>
    // /insert <baseName> data,data,data

    let query_array = query.split(" ")

    this.command = query_array[0]
    this.identifier = query_array[1]
    this.data = query_array[2]

  }

}