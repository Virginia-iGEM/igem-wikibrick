function dYdt = autocomplex2_001(t,Y)

%Y(1) = Ap
%Y(2) = Ai
%Y(3) = Ao
%Y(4) = B
%Y(5) = B|mrna
%Y(6) = F
%Y(7) = F|mrna
%Y(8) = G
%Y(9) = G|mrna
%Y(10) = K
%Y(11) = K|mrna
%Y(12) = P
%Y(13) = P|mrna
%Y(14) = R
%Y(15) = R|mrna
%Y(16) = S
%Y(17) = S|mrna
%Y(18) = T
%Y(19) = T|mrna
%Y(20) = Y
%Y(21) = Y|mrna

B = 1.225; %Transcription bias towards lsrA-side of lsr

k_AoP = 1;
k_AoB = 1;
k_AiK = 1;
k_AiY = 1;
k_ApF = 1; 
k_ApR = 1;

k_B = 1;    d_B = 1;
k_F = 1;    d_F = 1;
k_G = 1;    d_G = 1;
k_K = 1;    d_K = 1;
k_P = 1;    d_P = 1;
k_R = 1;    d_R = 1;
k_S = 1;    d_S = 1;
k_T = 1;    d_T = 1;
k_Y = 1;    d_Y = 1;

k_B|mrna = 1;d_B|mrna = 1;
k_F|mrna = 1;d_F|mrna = 1;
             d_G|mrna = 1;
k_K|mrna = 1;d_K|mrna = 1;
k_P|mrna = 1;d_P|mrna = 1;
k_R|mrna = 1;d_R|mrna = 1;
k_S|mrna = 1;d_S|mrna = 1;
             d_T|mrna = 1;
k_Y|mrna = 1;d_Y|mrna = 1;

kp_B|mrna = 1;
kp_F|mrna = 1;
kp_G|mrna = 1;
kp_K|mrna = 1;
kp_S|mrna = 1;
kp_T|mrna = 1;
kp_Y|mrna = 1;

r_R
r_T

n_1 = 
n_2 = 

----------------------

dAodt = -(((2*0.005)/110).*(t-240)).*exp(-(((t-240)/110).^2)); 
dATPdt = -k_lsrK*Y(1).*Y(2) - k_deg*Y(2)+k_deg*Y(2)+k_lsrK*Y(1).*Y(2);
dADPdt = k_lsrK*Y(1).*Y(2) - k_deg*Y(3);
dApdt = k_lsrK.*Y(1).*Y(2) - k_bind*(Y(4).^2)*Y(5) - k_degAp.*(Y(4));
dTdt = Vmax_tet.*(Y(15)).*(Y(16)) - k_bind.*Y(5).*Y(4).^2;
dDpbRdt = k_bind*Y(5).*(Y(4)).^2 - k_cleave1*Y(6);
dDpbAdt = k_bind*Y(5).*(Y(4)).^2 - k_cleave2*Y(7);
dDpdt = k_cleave1*Y(6) + k_cleave2*Y(7) - k_degDp*Y(8);
dDdt = k_pol*(Y(10).^2) - (Vm_lsrR.*Y(21).*((Y(9).^(nR))/(Kbind_lsrR^nR + (Y(9)).^nR))) - (Vm_lsrA.*Y(22).*((Y(9).^(nA))/(Kbind_lsrA^nA + (Y(9)).^nA))) ;
dMdt = k_tlM*Y(11) - k_pol*(Y(10).^2);
dmrnaRdt = k_tcR.*(Y(12)./(Y(12)+Y(23))).*Y(21) - (k_degMRNA).*Y(11);
dcAMPcrpbc1dt = k_c1*Y(14).*(Y(23)) - k_regen*Y(12);
dmrnaAdt = k_tcA.*(Y(19)./(Y(19)+Y(24))).*Y(22) - (k_degMRNA).*Y(13);
dcAMPCRPdt = k_cAMP.*Y(17).*Y(18) - Y(14).*(k_c1.*(Y(23)) + k_c2.*(Y(24)));
dDblsrAdt = Vm_lsrA.*(Y(22)).*(((Y(9)).^nA)./(Kbind_lsrA.^nA + (Y(9)).^nA)) - Vmax_tet*Y(15).*Y(16);
dDblsrRdt = Vm_lsrR.*(Y(21)).*(((Y(9)).^nR)./(Kbind_lsrR.^nR + (Y(9)).^nR)) - Vmax_tet*Y(15).*Y(16);
dcAMPdt = k_regen.*(Y(12)+Y(19)) - k_cAMP.*Y(17).*Y(18);
dCRPdt = k_regen.*(Y(12)+Y(19)) - k_cAMP.*Y(17).*Y(18);
dcAMPcrpbc2dt = k_c2.*Y(14).*(Y(24)) - k_regen*Y(19);
dAdt = k_tlA*Y(13) - k_deg*Y(20);
dlsrRdt = k_cleave1.*Y(6) - Vm_lsrR*Y(21).*(((Y(9)).^nR)./(Kbind_lsrR^nA + (Y(9)).^nR));
dlsrAdt = k_cleave2.*Y(7) - Vm_lsrA*Y(22).*(((Y(9)).^nA)./(Kbind_lsrA^nA + (Y(9)).^nA));
dC1dt = k_regen.*(Y(12)) - k_c1.*Y(14).*Y(23);
dC2dt = k_regen.*(Y(19)) - k_c2.*Y(14).*Y(24);
dmrnaXdt = k_tcR.*(Y(12)./(Y(12)+Y(23))).*Y(21) - (k_degMRNA).*Y(25);
dmrnaZdt = k_tcA.*(Y(19)./(Y(19)+Y(24))).*Y(22) - (k_degMRNA).*Y(26);
dBgalRdt = k_tl.*Y(25);
dBgalAdt = k_tlA.*Y(26);

dYdt = [dAodt; dATPdt; dADPdt; dApdt; dTdt; dDpbRdt; dDpbAdt; dDpdt; ...
    dDdt; dMdt; dmrnaRdt; dcAMPcrpbc1dt; dmrnaAdt; dcAMPCRPdt; dDblsrAdt; ...
    dDblsrRdt; dcAMPdt; dCRPdt; dcAMPcrpbc2dt; dAdt; dlsrRdt; dlsrAdt; ...
    dC1dt; dC2dt; dmrnaXdt; dmrnaZdt; dBgalRdt; dBgalAdt];
