import * as dialogs from "@extensions/dialogs";
import { TreeItem, ContextValues } from "@tree";
import { Action, RenameProjectFile, RenameProjectFolder } from "@actions";
import { ActionCommand } from "@commands/base";

export class RenameCommand extends ActionCommand {
    constructor() {
        super('Rename');
    }

    protected shouldRun(item: TreeItem): boolean {
        return !!item.project && !!item.path;
    }

    protected async getActions(item: TreeItem): Promise<Action[]> {
        if (!item || !item.project || !item.path) { return []; }

        const newname = await dialogs.getText('New name', 'New name', item.label);
        if (!newname) { return []; }

        if (item.contextValue.startsWith(ContextValues.projectFile)) {
            return [ new RenameProjectFile(item.project, item.path, newname) ];

        } else if (item.contextValue.startsWith(ContextValues.projectFolder)) {
            return [ new RenameProjectFolder(item.project, item.path, newname) ];
        }

        return [];
    }
}
