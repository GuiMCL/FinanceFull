module.exports=[182637,a=>a.a(async(b,c)=>{try{var d=a.i(372153),e=a.i(787706),f=a.i(852641),g=a.i(719771),h=a.i(76857),i=a.i(285953),j=a.i(447861),k=a.i(951441),l=a.i(789678),m=a.i(421920),n=a.i(90998),o=b([f,g,h]);[f,g,h]=o.then?(await o)():o;let q=m.z.object({pagadorId:m.z.string().uuid("Pagador inválido."),period:m.z.string().regex(/^\d{4}-\d{2}$/,"Período inválido. Informe no formato AAAA-MM.")}),r=a=>a.toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:2}),s=a=>{let[b,c]=a.split("-"),d=Number.parseInt(b,10),e=Number.parseInt(c,10)-1;return new Date(d,e,1).toLocaleDateString("pt-BR",{month:"long",year:"numeric"})},t=a=>a?a.toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"}):"—",u=a=>a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):"",v=a=>`<h3 style="font-size:16px;margin:24px 0 8px 0;color:#0f172a;">${a}</h3>`;async function p(a){try{let{pagadorId:b,period:c}=q.parse(a),d=await (0,g.getUser)(),m=await f.db.query.pagadores.findFirst({where:(0,i.and)((0,i.eq)(e.pagadores.id,b),(0,i.eq)(e.pagadores.userId,d.id))});if(!m)return{success:!1,error:"Pagador não encontrado."};if(!m.email)return{success:!1,error:"Cadastre um e-mail para conseguir enviar o resumo."};let n=process.env.RESEND_API_KEY,o=process.env.RESEND_FROM_EMAIL??"Opensheets <onboarding@resend.dev>";if(!n)return{success:!1,error:"Serviço de e-mail não configurado (RESEND_API_KEY ausente)."};let p=new l.Resend(n),[w,x,y,z,A,B,C]=await Promise.all([(0,h.fetchPagadorMonthlyBreakdown)({userId:d.id,pagadorId:b,period:c}),(0,h.fetchPagadorHistory)({userId:d.id,pagadorId:b,period:c}),(0,h.fetchPagadorCardUsage)({userId:d.id,pagadorId:b,period:c}),(0,h.fetchPagadorBoletoStats)({userId:d.id,pagadorId:b,period:c}),f.db.select({name:e.lancamentos.name,amount:e.lancamentos.amount,dueDate:e.lancamentos.dueDate}).from(e.lancamentos).where((0,i.and)((0,i.eq)(e.lancamentos.userId,d.id),(0,i.eq)(e.lancamentos.pagadorId,b),(0,i.eq)(e.lancamentos.period,c),(0,i.eq)(e.lancamentos.paymentMethod,"Boleto"))).orderBy((0,j.desc)(e.lancamentos.dueDate)),f.db.select({id:e.lancamentos.id,name:e.lancamentos.name,paymentMethod:e.lancamentos.paymentMethod,condition:e.lancamentos.condition,amount:e.lancamentos.amount,transactionType:e.lancamentos.transactionType,purchaseDate:e.lancamentos.purchaseDate}).from(e.lancamentos).where((0,i.and)((0,i.eq)(e.lancamentos.userId,d.id),(0,i.eq)(e.lancamentos.pagadorId,b),(0,i.eq)(e.lancamentos.period,c))).orderBy((0,j.desc)(e.lancamentos.purchaseDate)),f.db.select({name:e.lancamentos.name,amount:e.lancamentos.amount,installmentCount:e.lancamentos.installmentCount,currentInstallment:e.lancamentos.currentInstallment,purchaseDate:e.lancamentos.purchaseDate}).from(e.lancamentos).where((0,i.and)((0,i.eq)(e.lancamentos.userId,d.id),(0,i.eq)(e.lancamentos.pagadorId,b),(0,i.eq)(e.lancamentos.period,c),(0,i.eq)(e.lancamentos.condition,"Parcelado"),(0,i.eq)(e.lancamentos.isAnticipated,!1))).orderBy((0,j.desc)(e.lancamentos.purchaseDate))]),D=A.map(a=>({name:a.name??"Sem descrição",amount:Math.abs(Number(a.amount??0)),dueDate:a.dueDate})),E=B.map(a=>({id:a.id,name:a.name,paymentMethod:a.paymentMethod,condition:a.condition,transactionType:a.transactionType,purchaseDate:a.purchaseDate,amount:Number(a.amount??0)})),F=C.map(a=>{let b=Math.abs(Number(a.amount??0)),c=a.installmentCount??1;return{name:a.name??"Sem descrição",installmentAmount:b,installmentCount:c,currentInstallment:a.currentInstallment??1,totalAmount:b*c,purchaseDate:a.purchaseDate}}),G=(({pagadorName:a,periodLabel:b,monthlyBreakdown:c,historyData:d,cardUsage:e,boletoStats:f,boletos:g,lancamentos:h,parcelados:i})=>{let j=Math.max(...d.map(a=>a.despesas),1),k=d.length>0?d.map(a=>{let b=a.despesas/j*100,c=a.despesas>.8*j?"#ef4444":a.despesas>.5*j?"#f59e0b":"#10b981";return`
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:500;">${u(a.label)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="flex:1;background:#f1f5f9;border-radius:6px;height:24px;overflow:hidden;">
                  <div style="background:${c};height:100%;width:${b}%;transition:width 0.3s;"></div>
                </div>
                <span style="font-weight:600;min-width:100px;text-align:right;">${r(a.despesas)}</span>
              </div>
            </td>
          </tr>`}).join(""):`<tr><td colspan="2" style="padding:16px;text-align:center;color:#94a3b8;">Sem hist\xf3rico suficiente.</td></tr>`,l=e.length>0?e.map(a=>`
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:500;">${u(a.name)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:600;">${r(a.amount)}</td>
          </tr>`).join(""):`<tr><td colspan="2" style="padding:16px;text-align:center;color:#94a3b8;">Sem gastos com cart\xe3o neste per\xedodo.</td></tr>`,m=g.length>0?g.map(a=>`
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:500;">${u(a.name)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${a.dueDate?t(a.dueDate):"—"}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:600;">${r(a.amount)}</td>
          </tr>`).join(""):`<tr><td colspan="3" style="padding:16px;text-align:center;color:#94a3b8;">Sem boletos neste per\xedodo.</td></tr>`,n=h.length>0?h.map(a=>`
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;white-space:nowrap;">${t(a.purchaseDate)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${u(a.name)||"Sem descrição"}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${u(a.condition)||"—"}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${u(a.paymentMethod)||"—"}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:600;">${r(a.amount)}</td>
          </tr>`).join(""):`<tr><td colspan="5" style="padding:16px;text-align:center;color:#94a3b8;">Nenhum lan\xe7amento registrado no per\xedodo.</td></tr>`,o=i.length>0?i.map(a=>`
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;white-space:nowrap;">${t(a.purchaseDate)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${u(a.name)||"Sem descrição"}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">${a.currentInstallment}/${a.installmentCount}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:600;">${r(a.installmentAmount)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;color:#64748b;">${r(a.totalAmount)}</td>
          </tr>`).join(""):`<tr><td colspan="5" style="padding:16px;text-align:center;color:#94a3b8;">Nenhum lan\xe7amento parcelado neste per\xedodo.</td></tr>`;return`
    <div style="margin:0 auto;max-width:800px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter',Arial,sans-serif;color:#0f172a;line-height:1.6;">
  <!-- Preheader invis\xedvel (melhora a pr\xe9via no cliente de e-mail) -->
  <span style="display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">Resumo mensal e detalhes de gastos por cart\xe3o, boletos e lan\xe7amentos.</span>

  <!-- Cabe\xe7alho -->
  <div style="background:linear-gradient(90deg,#dc5a3a,#ea744e);padding:28px 24px;border-radius:12px 12px 0 0;">
    <h1 style="margin:0 0 6px 0;font-size:26px;font-weight:800;letter-spacing:-0.3px;color:#ffffff;">Resumo Financeiro</h1>
    <p style="margin:0;font-size:15px;color:#ffece6;">${u(b)}</p>
  </div>

  <!-- Cart\xe3o principal -->
  <div style="background:#ffffff;padding:28px 24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
    <!-- Sauda\xe7\xe3o -->
    <p style="margin:0 0 24px 0;font-size:15px;color:#334155;">
      Ol\xe1 <strong>${u(a)}</strong>, segue o consolidado do m\xeas:
    </p>

    <!-- Totais do m\xeas -->
    ${v("💰 Totais do mês")}
    <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 28px 0;border:1px solid #f1f5f9;border-radius:10px;overflow:hidden;">
      <tbody>
        <tr>
          <td style="padding:16px 18px;background:#fff7f5;border-bottom:1px solid #f1f5f9;font-size:15px;color:#475569;">Total gasto</td>
          <td style="padding:16px 18px;background:#fff7f5;border-bottom:1px solid #f1f5f9;text-align:right;">
            <strong style="font-size:22px;color:#0f172a;">${r(c.totalExpenses)}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 18px;font-size:14px;color:#64748b;">💳 Cart\xf5es</td>
          <td style="padding:12px 18px;text-align:right;"><strong style="font-size:15px;color:#0f172a;">${r(c.paymentSplits.card)}</strong></td>
        </tr>
        <tr style="background:#fcfcfd;">
          <td style="padding:12px 18px;font-size:14px;color:#64748b;">📄 Boletos</td>
          <td style="padding:12px 18px;text-align:right;"><strong style="font-size:15px;color:#0f172a;">${r(c.paymentSplits.boleto)}</strong></td>
        </tr>
        <tr>
          <td style="padding:12px 18px;font-size:14px;color:#64748b;">⚡ Pix/D\xe9bito/Dinheiro</td>
          <td style="padding:12px 18px;text-align:right;"><strong style="font-size:15px;color:#0f172a;">${r(c.paymentSplits.instant)}</strong></td>
        </tr>
      </tbody>
    </table>

    <!-- Evolu\xe7\xe3o 6 meses -->
    ${v("📊 Evolução das Despesas (6 meses)")}
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin:0 0 28px 0;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Per\xedodo</th>
          <th style="text-align:right;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Valor</th>
        </tr>
      </thead>
      <tbody>${k}</tbody>
    </table>

    <!-- Gastos por cart\xe3o -->
    ${v("💳 Gastos com Cartões")}
     <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 8px 0;">
      <tr>
        <td style="padding:10px 0;border-bottom:2px solid #e2e8f0;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="color:#475569;font-weight:700;font-size:15px;">Total</td>
              <td style="text-align:right;">
                <strong style="font-size:18px;color:#0f172a;">${r(c.paymentSplits.card)}</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin:0 0 28px 0;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Cart\xe3o</th>
          <th style="text-align:right;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Valor</th>
        </tr>
      </thead>
      <tbody>${l}</tbody>
    </table>

    <!-- Boletos -->
    ${v("📄 Boletos")}
    <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 8px 0;">
      <tr>
        <td style="padding:10px 0;border-bottom:2px solid #e2e8f0;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="color:#475569;font-weight:700;font-size:15px;">Total</td>
              <td style="text-align:right;">
                <strong style="font-size:18px;color:#0f172a;">${r(f.totalAmount)}</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin:0 0 28px 0;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Descri\xe7\xe3o</th>
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Vencimento</th>
          <th style="text-align:right;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Valor</th>
        </tr>
      </thead>
      <tbody>${m}</tbody>
    </table>

    <!-- Lan\xe7amentos -->
    ${v("📝 Lançamentos do Mês")}
    <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Data</th>
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Descri\xe7\xe3o</th>
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Condi\xe7\xe3o</th>
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Pagamento</th>
          <th style="text-align:right;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Valor</th>
        </tr>
      </thead>
      <tbody>${n}</tbody>
    </table>

    <!-- Lan\xe7amentos Parcelados -->
    ${v("💳 Lançamentos Parcelados")}
    <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Data</th>
          <th style="text-align:left;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Descri\xe7\xe3o</th>
          <th style="text-align:center;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Parcela</th>
          <th style="text-align:right;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Valor Parcela</th>
          <th style="text-align:right;padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Total</th>
        </tr>
      </thead>
      <tbody>${o}</tbody>
    </table>

    <!-- Divisor suave -->
    <div style="height:1px;background:#e2e8f0;margin:28px 0;"></div>
  </div>

  <!-- Rodap\xe9 externo -->
  <p style="margin:16px 0 0 0;font-size:12.5px;color:#94a3b8;text-align:center;">
    Este e-mail foi enviado automaticamente pelo <strong>Opensheets</strong>.
  </p>
</div>

  `})({pagadorName:m.name,periodLabel:s(c),monthlyBreakdown:w,historyData:x,cardUsage:y,boletoStats:z,boletos:D,lancamentos:E,parcelados:F});await p.emails.send({from:o,to:m.email,subject:`Resumo Financeiro | ${s(c)}`,html:G});let H=new Date;return await f.db.update(e.pagadores).set({lastMailAt:H}).where((0,i.and)((0,i.eq)(e.pagadores.id,m.id),(0,i.eq)(e.pagadores.userId,d.id))),(0,k.revalidatePath)(`/pagadores/${m.id}`),{success:!0,message:"Resumo enviado com sucesso."}}catch(a){if(a instanceof m.z.ZodError)return{success:!1,error:a.issues[0]?.message??"Dados inválidos."};return{success:!1,error:"Não foi possível enviar o resumo. Tente novamente mais tarde."}}}(0,n.ensureServerEntryExports)([p]),(0,d.registerServerReference)(p,"40e9a81ea0a35b1674236aacf9dbf8571a3946a613",null),a.s(["sendPagadorSummaryAction",()=>p]),c()}catch(a){c(a)}},!1),868142,a=>a.a(async(b,c)=>{try{var d=a.i(307506),e=a.i(689173),f=a.i(182637),g=a.i(207084),h=a.i(23185),i=a.i(267376),j=b([d,e,f,g,h,i]);[d,e,f,g,h,i]=j.then?(await j)():j,a.s([]),c()}catch(a){c(a)}},!1),841543,a=>a.a(async(b,c)=>{try{var d=a.i(868142),e=a.i(307506),f=a.i(689173),g=a.i(182637),h=a.i(207084),i=a.i(23185),j=a.i(267376),k=b([d,e,f,g,h,i,j]);[d,e,f,g,h,i,j]=k.then?(await k)():k,a.s(["400f196431bf44b7a7ecc7f076ea8af014ead3e724",()=>e.markAllUpdatesAsRead,"401ebc553414c8523b7e37aa65e68e063d0add1082",()=>i.updateLancamentoAction,"4024c4d6d5740dec710fe7e31ab7d0680e6820df8f",()=>i.deleteLancamentoBulkAction,"403299c31d5dd60ef8d46e6b542182eba8b26c2e48",()=>i.updateLancamentoBulkAction,"4033c9b3c8a3955475e58b93c596d83beeab0f8e4e",()=>j.getEligibleInstallmentsAction,"40520fc71e842d56e735accd8b16867d13f7a780cb",()=>h.deletePagadorShareAction,"4057b5889ba78290c7536147488266bfd6df820d04",()=>i.deleteMultipleLancamentosAction,"407c5956482ec8946c1871b6f0677192bf2efd58c3",()=>i.deleteLancamentoAction,"409d6ad757818111bc3954a98f298c08548768c64d",()=>i.createLancamentoAction,"409f881b2a2c2b8227d7a06c5d5f1c724ab021b233",()=>j.cancelInstallmentAnticipationAction,"40b0d9dd09ec779dff140162e8230b49294cdb5d6b",()=>j.getInstallmentAnticipationsAction,"40c1071aa33364ecde40decede3228646bac5e964e",()=>j.createInstallmentAnticipationAction,"40c16b8368d61ca75e251138d9bf4ad00ce5c3ca56",()=>i.toggleLancamentoSettlementAction,"40de7114712f70d46bc5291ee3390c40f475509741",()=>h.regeneratePagadorShareCodeAction,"40e9a81ea0a35b1674236aacf9dbf8571a3946a613",()=>g.sendPagadorSummaryAction,"40fe1950fdf51f3a48feda294034eea0eb6e40b020",()=>i.createMassLancamentosAction,"6090abf6ce2025521a9864fe67dd2e42c2dd9767f4",()=>f.fetchDashboardNotifications]),c()}catch(a){c(a)}},!1)];

//# sourceMappingURL=Documents_GitHub_FinanceFull_b30efbe8._.js.map