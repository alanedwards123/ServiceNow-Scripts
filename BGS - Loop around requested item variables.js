var gr = new GlideRecord("sc_req_item");
gr.addQuery('sys_id', '3e8c56860fe31a0031d81efae1050ed3');
gr.query();
while(gr.next()) {
   for (key in gr.variables) {
      var v = gr.variables[key];
      gs.print(v.getGlideObject().getQuestion().getLabel() + " = " + v.getDisplayValue());
   }
}
