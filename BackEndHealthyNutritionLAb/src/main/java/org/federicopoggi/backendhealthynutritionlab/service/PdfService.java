package org.federicopoggi.backendhealthynutritionlab.service;

import com.aspose.pdf.*;
import com.aspose.pdf.internal.html.dom.Text;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.apache.poi.sl.usermodel.TextParagraph;
import org.federicopoggi.backendhealthynutritionlab.model.Diet;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Map;


@Service
public class PdfService {
    String input = "src/main/java/org/federicopoggi/backendhealthynutritionlab/directoryTemplate/template-pdf.html";
    String out="src/main/java/org/federicopoggi/backendhealthynutritionlab/PDFGENERATI/out.pdf";
    public byte[] generatePDF(Diet d) {
        try (InputStream in = new FileInputStream(input);) {
            HtmlLoadOptions opt = new HtmlLoadOptions();

            Document pdf = new Document();

            Page pages= pdf.getPages().add();

            HtmlFragment frag=new HtmlFragment(new String(in.readAllBytes()));

            Table t=generateTable();
            addElem(t,d.getAlimentiQuantita());

            TextFragment sub=new TextFragment("Paziente: " + d.getCustomer().getName());
            TextFragment subEmail=new TextFragment("Email: " + d.getCustomer().getName());
            double pageWidht=pages.getRect().getWidth();
            double withRect=300;
            double x=(pageWidht-withRect)/2;
            BaseParagraph container=new TextFragment("Paziente: " + d.getCustomer().getName()+"   " + "Email: " + d.getCustomer().getEmail());
            container.setHorizontalAlignment(50);
            container.setInLineParagraph(true);

            pages.getParagraphs().add(container);

            pages.getParagraphs().add(frag);

            pages.getParagraphs().add(t);

            System.out.println("pdf creato");
            ByteArrayOutputStream os=new ByteArrayOutputStream();
            pdf.save(os);
            return os.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
    public Table generateTable(){
        MarginInfo m=new MarginInfo(5,5,5,5);
        Table table=new Table();
        table.setAlignment(30);
        table.setColumnWidths("350 350");
        table.setDefaultCellPadding(m);

        Row rowHead=table.getRows().add();
        rowHead.getCells().add("Alimento");
        rowHead.getCells().add("Quantità");
        rowHead.setBackgroundColor(Color.getGreen());
        rowHead.setMinRowHeight(30);

        rowHead.setDefaultCellPadding(m);
        return table;
    }

    public void addElem(Table t, Map<String,Integer> alimenti){
        for(Map.Entry<String,Integer> entry:alimenti.entrySet()){
            Row row=t.getRows().add();
            row.getCells().add(entry.getKey());
            row.getCells().add(entry.getValue().toString());
        }
    }
}
