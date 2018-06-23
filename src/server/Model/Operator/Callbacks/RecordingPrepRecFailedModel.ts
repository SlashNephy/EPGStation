import * as DBSchema from '../../DB/DBSchema';
import Model from '../../Model';
import { ProgramExternalProcessModelInterface } from '../../Operator/ProgramExternalProcessModel';
import { RecordingManageModelInterface } from '../../Operator/Recording/RecordingManageModel';
import CallbackBaseModelInterface from './CallbackBaseModelInterface';

/**
 * RecordingPrepRecFailedModel
 * 録画準備開失敗時の処理
 */
class RecordingPrepRecFailedModel extends Model implements CallbackBaseModelInterface {
    private recordingManage: RecordingManageModelInterface;
    private externalProcess: ProgramExternalProcessModelInterface;

    constructor(
        recordingManage: RecordingManageModelInterface,
        externalProcess: ProgramExternalProcessModelInterface,
    ) {
        super();

        this.recordingManage = recordingManage;
        this.externalProcess = externalProcess;
    }

    public set(): void {
        this.recordingManage.preprecFailedListener((program) => { this.callback(program); });
    }

    /**
     * @param program: DBSchema.ProgramSchema
     */
    private async callback(program: DBSchema.ProgramSchema): Promise<void> {
        // 外部コマンド実行
        const cmd = this.config.getConfig().recordedPrepRecFailedCommand;
        if (typeof cmd !== 'undefined') {
            await this.externalProcess.run(cmd, program, 'recording preprec failed');
        }
    }
}

export default RecordingPrepRecFailedModel;

