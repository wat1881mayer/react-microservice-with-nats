import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

//Properties that are required to build a new Ticket
//チケットの作成に必要な引数の定義
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

//Properties that a Ticket has
//チケットが持つべきプロパティの定義
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}

//Properties tied to the Model
//モデルが持つプロパティの定義
//mongoose.Modelは、hydratedDocument<document interface>を返すので、genericsにはdocumentのプロパティを渡す。
//buildは、modelをnewする。modelのインスタンスがDocumentなので、mongoose.Documentを継承したTicketDocが戻り値でOK
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
