n<template>
  <v-container fluid>
    <v-toolbar>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-row justify="end">
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn v-show="showAddButton" tile color="primary" class="mx-2" dark v-on="on">Dodaj</v-btn>
          </template>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>           
                    <v-col cols="12" sm="12" md="12">
                      <v-file-input
                        v-model="files"
                        multiple
                        show-size
                        label="Wybierz plik"
                        :rules="fileRules"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn tile color="blue darken-1" text @click="close">Anuluj</v-btn>
                <v-btn tile color="blue darken-1" text @click="save">Zapisz</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>
    </v-toolbar>
    <v-data-table :headers="headers" :items="items" class="elevation-1" :loading="loading">
      <template v-slot:item="props">
        <tr>
          <td class="text-left">{{ props.item.documentId }}</td>
          <td class="text-left">{{ props.item.documentName }}</td>
          <td class="text-left">{{ props.item.issueDate}}</td>
          <td class="text-left">{{ props.item.author }}</td>
          <td class="justify-center">

            <v-icon v-if="!deleteDisabled && !disabled" small class="mr-2" @click="openDeleteDialog(props.item)"
              >delete</v-icon
            >

            <v-icon v-if="!downloadDisabled" small class="mr-2" @click="openInBrowser(props.item)"
              >open_in_browser</v-icon
            >
            <v-icon v-if="!downloadDisabled" small class="mr-2" @click="downloadDocument(props.item)">get_app</v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn tile color="primary" @click="refresh">Odśwież</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Na pewno chcesz usunąć dokument?</v-card-title>
        <v-card-text>Potwierdzenie spowoduje usunięcie dokumentu.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn tile color="green darken-1" text @click="cancelDelete()">Anuluj</v-btn>
          <v-btn tile color="green darken-1" text @click="deleteItem()">Usuń</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
/**
 *
 * Przykładowe osadzenie
 * <DocumentControl
 *     v-if="editedIndex > -1"
 *     :caseId="editedItem.mrcCaseHeader.caseId"
 *     :documentTypes="documentTypes"
 *   />
 */
import { readUploadedFile } from '@/utils/readUploadedFile.js';
import createBlobFromBase64 from '@/utils/createBlobFromBase64';
export default {
  name: 'DocumentControl',
  props: { 
    addDisabled: {
      type: Boolean,
      default: false
    },
    editDisabled: {
      type: Boolean,
      default: false
    },
    deleteDisabled: {
      type: Boolean,
      default: false
    },
    downloadDisabled: {
      type: Boolean,
      default: false
    },   
    disabled: {
      type: Boolean,
      default: false
    },   
    title: {
      type: String,
      default: 'Dokumenty'
    },
    path: {
      type: String,
      default: ''
    },
    objectTypeId: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    loading: false,
    dialog: false,
    deleteDialog: false,
    currentDocument: null,
    headers: [
      { text: 'ID', value: 'documentId' },
      { text: 'Nazwa', value: 'documentName' },
      { text: 'Data utworzenia', value: 'documentTypeName' },
      { text: 'Autor', value: 'author' }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    total: 0,
    valid: true,
    fileRules: [v => (v && v.length > 0) || 'Załącz dokument'],
    files: null    
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nowy dokument' : 'Edycja dokumentu';
    },
    showAddButton() {
      let result = !this.addDisabled && !this.disabled;
      console.log(
        `DocumentControl: addDisabled=${this.addDisabled} & disabled=${this.disabled} => showAddButton=${result}`
      );
      return result;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    async files(val) {
      if (val){
        this.editedItem.contentStream = val[0] ? await readUploadedFile(val[0]) : null;
      }
    },
    addDisabled(newVal) {
      console.log(`DocumentControl - addDisabled changed to ${newVal} (disabled=${this.disabled})`);
    }
  },
  created() {
    this.getDocumentList();
  },
  methods: {
    openDeleteDialog(item) {
      this.currentDocument = item;
      this.deleteDialog = true;
    },
    cancelDelete() {
      this.deleteDialog = false;
      this.currentDocument = null;
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },
    refresh() {
      this.getDocumentList();
    },
    close() {
      this.dialog = false;
      /* timeout jest ok, ponieważ aktualizujemy dane dopiero jak zamknie się modal */
      setTimeout(() => {
        this.editedItem = JSON.parse(JSON.stringify(this.defaultItem));
        this.files = null;
        this.editedIndex = -1;
        this.$refs.form && this.$refs.form.resetValidation();
      }, 300);
    },
    async getDocumentList() {
      var params = {
        path: this.path
      };
      try {
        let result = await this.sendAjaxWithParams(this.appUrls.getDocumentListService, params);
        this.items = result.documentList.items;
        this.$emit('input', result.documentList);
      } catch (e) {
        console.error(e);
      }
      this.loading = false;
    },
    async save() {
      if (this.validate()) {
         let params = {
            objectTypeId: this.objectTypeId,
            documentContentStream: this.editedItem.contentStream,
            documentName: this.editedItem.contentStream.fileName,
            path: this.path
          };
          try {
            let result = await this.sendAjaxWithParams(this.appUrls.createDocumentService, params);
            console.log(result.messageInfo);      
            this.close();
            this.getDocumentList();
          } catch (e) {
           console.error( e);
          }
      }
    },
    async deleteItem() {
      this.deleteDialog = false;
      var params = {
        documentId: this.currentDocument.documentId,
      };
      try {
        let result = await this.sendAjaxWithParams(this.appUrls.deleteDocumentService, params);
       console.log( result.messageInfo);
        this.close();
        this.getDocumentList();
      } catch (e) {
       console.error( e);
      }
    },
    async openInBrowser(item) {
      try {
        var contentStream = await this.documentContentGet(item.documentId);
        var { mimeType } = contentStream;
        var base64 = contentStream.content;
        var blobURL = createBlobFromBase64(base64, mimeType);
        window.open(blobURL, '');
      } catch (e) {
      console.error( e);
      }
    },
    async downloadDocument(item) {
      try {
        var contentStream = await this.documentContentGet(item.documentId);
        var { mimeType } = contentStream;
        var base64 = contentStream.content;
        var blobURL = createBlobFromBase64(base64, mimeType);
        var { fileName } = contentStream;
        var downloadLink = document.createElement('a');
        downloadLink.href = blobURL;
        downloadLink.download = fileName;
        downloadLink.setAttribute('target', '_blank');
        document.body.appendChild(downloadLink);
        setTimeout(() => {
          downloadLink.click();
          document.body.removeChild(downloadLink);
          setTimeout(() => {
            var URL = window.URL || window.webkitURL;
            URL.revokeObjectURL(blobURL);
          }, 250);
        }, 66);
      } catch (e) {
        console.error( e);
      }
    },
    async documentContentGet(objectId) {
      var params = {
        documentId: objectId
      };
      var data = await this.sendAjaxWithParams(this.appUrls.getDocumentContentService, params);
      let { contentStream } = data;
      return contentStream;
    },
    validate() {
      let formValidate = this.$refs.form.validate();
      return formValidate;
    }
  }
};
</script>